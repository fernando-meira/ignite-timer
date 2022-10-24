import { useState, createContext } from 'react';
import * as zod from 'zod';
import { HandPalm, Play } from 'phosphor-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';

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

type NewCycleFormData = zod.infer<typeof newCycleValidationSchema>;

const newCycleValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod.number().min(1).max(60),
});

interface CyclesContextType {
  amountSecondsPassed: number;
  activeCycleId: string | null;
  activeCycle: Cycle | undefined;
  markCurrentCycleAsFinished: () => void;
  setSecondsPassed: (seconds: number) => void;
}

export const CyclesContext = createContext({} as CyclesContextType);

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  });

  const { handleSubmit, watch, reset } = newCycleForm;

  const isSubmitDisabled = !watch('task') || !watch('minutesAmount');
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  function handleCreateNewCycle(data: NewCycleFormData) {
    console.log('chegou aqui');

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

  function markCurrentCycleAsFinished() {
    setCycles((cycles) =>
      cycles.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, finishedCycleDate: new Date() };
        } else {
          return cycle;
        }
      })
    );
  }

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

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds);
  }

  return (
    <CyclesContext.Provider
      value={{
        activeCycle,
        activeCycleId,
        setSecondsPassed,
        amountSecondsPassed,
        markCurrentCycleAsFinished,
      }}
    >
      <S.HomeContainer>
        <S.Form onSubmit={handleSubmit(handleCreateNewCycle)}>
          <FormProvider {...newCycleForm}>
            <NewCycleForm />
          </FormProvider>

          <Countdown />

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
    </CyclesContext.Provider>
  );
}
