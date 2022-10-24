import * as zod from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import * as S from './styles';

const newCycleValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod.number().min(1).max(60),
});

type NewCycleFormData = zod.infer<typeof newCycleValidationSchema>;

export function NewCycleForm() {
  const { register, handleSubmit, watch, formState, reset } =
    useForm<NewCycleFormData>({
      resolver: zodResolver(newCycleValidationSchema),
      defaultValues: {
        task: '',
        minutesAmount: 0,
      },
    });

  const hasError = formState.errors;

  return (
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
  );
}
