import * as zod from 'zod';
import { Play } from 'phosphor-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import * as S from './styles';
import { Countdown } from './components';

const newCycleValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod.number().min(5).max(60).step(5),
});

type NewCycleFormData = zod.infer<typeof newCycleValidationSchema>;

export function Home() {
  const { register, handleSubmit, watch, formState, reset } =
    useForm<NewCycleFormData>({
      resolver: zodResolver(newCycleValidationSchema),
      defaultValues: {
        task: '',
        minutesAmount: 0,
      },
    });

  const hasError = formState.errors;
  const isSubmitDisabled = !watch('task') || !watch('minutesAmount');

  function handleCreateNewCycle(data: any) {
    console.log(data);
    reset();
  }

  return (
    <S.HomeContainer>
      <S.Form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <S.FormContainer>
          <label htmlFor="task">Vou trabalhar no projeto</label>
          <S.TaskInput
            id="task"
            type="text"
            placeholder="..."
            list="task-suggestion"
            hasError={!!hasError?.task?.message}
            {...register('task')}
          />

          <datalist id="task-suggestion">
            <option value="Projeto 1" />
            <option value="Projeto 2" />
            <option value="Projeto 3" />
            <option value="Projeto 4" />
          </datalist>

          <label htmlFor="minutesAmount">Durante</label>
          <S.MinutesAmountInput
            type="number"
            placeholder="00"
            id="minutesAmount"
            hasError={!!hasError?.minutesAmount?.message}
            {...register('minutesAmount', { valueAsNumber: true })}
          />

          <span>Minutos</span>
        </S.FormContainer>

        <Countdown />

        <S.StartCountdownButton type="submit" disabled={isSubmitDisabled}>
          Começar <Play size={24} />
        </S.StartCountdownButton>
      </S.Form>
    </S.HomeContainer>
  );
}
