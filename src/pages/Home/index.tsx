import { useContext } from 'react';
import * as zod from 'zod';
import { HandPalm, Play } from 'phosphor-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';

import * as S from './styles';
import { Countdown, NewCycleForm } from './components';
import { CyclesContext } from '../../context/CyclesContext';

type NewCycleFormData = zod.infer<typeof newCycleValidationSchema>;

const newCycleValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod.number().min(1).max(60),
});

export function Home() {
  const { activeCycle, createNewCycle, interruptCurrentCycle } =
    useContext(CyclesContext);

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  });

  const { handleSubmit, watch, reset } = newCycleForm;

  const isSubmitDisabled = !watch('task') || !watch('minutesAmount');

  function handleCreateNewCycle(data: NewCycleFormData) {
    createNewCycle(data);
    reset();
  }

  return (
    <S.HomeContainer>
      <S.Form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>

        <Countdown />

        {activeCycle ? (
          <S.StopCountdownButton
            disabled={!activeCycle}
            onClick={interruptCurrentCycle}
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
