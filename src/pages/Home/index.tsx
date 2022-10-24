import { useEffect, useState } from 'react';
import { HandPalm, Play } from 'phosphor-react';

import * as S from './styles';
import { Countdown, NewCycleForm } from './components';

interface Cycle {
  id: string;
  task: string;
  startDate: Date;
  minutesAmount: number;
  finishedCycleDate?: Date;
  interruptedCycleDate?: Date;
}

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);

  const isSubmitDisabled = !watch('task') || !watch('minutesAmount');

  function handleCreateNewCycle(data: NewCycleFormData) {
    const { task, minutesAmount } = data;
    const id = String(new Date().getTime());

    const newCycle: Cycle = {
      id,
      task,
      minutesAmount,
      startDate: new Date(),
    };

    setActiveCycleId(id);
    setAmountSecondsPassed(0);

    setCycles((cycles) => [...cycles, newCycle]);

    reset();
  }

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  function handleInterruptCycle() {
    setCycles((cycles) =>
      cycles.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedCycleDate: new Date() };
        } else {
          return cycle;
        }
      })
    );

    setActiveCycleId(null);
  }

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`;
    }
  }, [minutes, seconds, activeCycle]);

  return (
    <S.HomeContainer>
      <S.Form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <NewCycleForm />

        <Countdown minutes={minutes} seconds={seconds} />

        {activeCycle ? (
          <S.StopCountdownButton
            disabled={!activeCycle}
            onClick={handleInterruptCycle}
          >
            Interromper <HandPalm size={24} />
          </S.StopCountdownButton>
        ) : (
          <S.StartCountdownButton type="submit" disabled={isSubmitDisabled}>
            Começar <Play size={24} />
          </S.StartCountdownButton>
        )}
      </S.Form>
    </S.HomeContainer>
  );
}
