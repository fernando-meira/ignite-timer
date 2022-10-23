import { Play } from 'phosphor-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';

import * as S from './styles';

const newCycleValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutes: zod
    .number()
    .min(5, 'O tempo mínimo para uma tarefa é de 5 minutos.')
    .max(60, 'O tempo máximo para uma tarefa é de 60 minutos.')
    .step(5, 'O tempo deve ser múltiplo de 5'),
});

export function Home() {
  const { register, handleSubmit, watch, formState } = useForm({
    resolver: zodResolver(newCycleValidationSchema),
  });

  console.log('errors', formState.errors);

  function handleCreateNewCycle(data: any) {
    console.log(data);
  }

  const hasError = formState.errors;

  const isSubmitDisabled = !watch('task') || !watch('minutes');

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
            hasError={!!hasError?.minutes?.message}
            {...register('minutes', { valueAsNumber: true })}
          />

          <span>Minutos</span>
        </S.FormContainer>

        <S.CountdownContainer>
          <S.CountdownItem>0</S.CountdownItem>
          <S.CountdownItem>0</S.CountdownItem>

          <S.Separator>:</S.Separator>

          <S.CountdownItem>0</S.CountdownItem>
          <S.CountdownItem>0</S.CountdownItem>
        </S.CountdownContainer>

        <S.StartCountdownButton type="submit" disabled={isSubmitDisabled}>
          Começar <Play size={24} />
        </S.StartCountdownButton>
      </S.Form>
    </S.HomeContainer>
  );
}
