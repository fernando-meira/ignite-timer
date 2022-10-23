import { useEffect, useState } from 'react';
import * as zod from 'zod';
import { HandPalm, Play } from 'phosphor-react';
import { useForm } from 'react-hook-form';
import { differenceInSeconds } from 'date-fns';
import { zodResolver } from '@hookform/resolvers/zod';

import * as S from './styles';
import { Countdown } from './components';

const newCycleValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod.number().min(5).max(60).step(5),
});

type NewCycleFormData = zod.infer<typeof newCycleValidationSchema>;

interface Cycle {
  id: string;
  task: string;
  startDate: Date;
  minutesAmount: number;
  interruptedCycleDate?: Date;
}

export function Home() {
  const { register, handleSubmit, watch, formState, reset } =
    useForm<NewCycleFormData>({
      resolver: zodResolver(newCycleValidationSchema),
      defaultValues: {
        task: '',
        minutesAmount: 0,
      },
    });

  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);

  const hasError = formState.errors;
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

  const totalSeconds = !!activeCycle ? activeCycle.minutesAmount * 60 : 0;
  const currentSeconds = !!activeCycle ? totalSeconds - amountSecondsPassed : 0;

  const secondsAmount = currentSeconds % 60;
  const minutesAmount = Math.floor(currentSeconds / 60);

  const minutes = String(minutesAmount).padStart(2, '0');
  const seconds = String(secondsAmount).padStart(2, '0');

  function handleInterruptCycle() {
    setCycles(
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
    let interval: number;

    if (!!activeCycle) {
      interval = setInterval(() => {
        setAmountSecondsPassed(
          differenceInSeconds(new Date(), activeCycle.startDate)
        );
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [activeCycle]);

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`;
    }
  }, [minutes, seconds, activeCycle]);

  console.log('cycles', cycles);

  return (
    <S.HomeContainer>
      <S.Form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <S.FormContainer>
          <label aria-disabled={!!activeCycle} htmlFor="task">
            Vou trabalhar no projeto
          </label>

          <S.TaskInput
            id="task"
            type="text"
            placeholder="..."
            list="task-suggestion"
            disabled={!!activeCycle}
            hasError={!!hasError?.task?.message}
            {...register('task')}
          />

          <datalist id="task-suggestion">
            <option value="Teste" />
          </datalist>

          <label htmlFor="minutesAmount">Durante</label>
          <S.MinutesAmountInput
            type="number"
            placeholder="00"
            id="minutesAmount"
            disabled={!!activeCycle}
            hasError={!!hasError?.minutesAmount?.message}
            {...register('minutesAmount', { valueAsNumber: true })}
          />

          <span>Minutos</span>
        </S.FormContainer>

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
