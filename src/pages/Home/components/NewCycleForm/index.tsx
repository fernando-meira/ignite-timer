import { useContext } from 'react';
import { useFormContext } from 'react-hook-form';

import { CyclesContext } from '../..';

import * as S from './styles';

export function NewCycleForm() {
  const { activeCycle } = useContext(CyclesContext);
  const { register, formState, watch } = useFormContext();

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
