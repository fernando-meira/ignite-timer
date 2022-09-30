import { Play } from 'phosphor-react';

import * as S from './styles';

export function Home() {
  return (
    <S.HomeContainer>
      <S.Form action="">
        <S.FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <S.TaskInput
            id="task"
            type="text"
            list="task-suggestion"
            placeholder="Dê um nome para o seu projeto"
          />

          <datalist id="task-suggestion">
            <option value="Projeto 1" />
            <option value="Projeto 2" />
            <option value="Projeto 3" />
            <option value="Projeto 4" />
          </datalist>

          <label htmlFor="minutesAmount">Durante</label>
          <S.MinutesAmountInput
            min={5}
            step={5}
            max={60}
            type="number"
            placeholder="00"
            id="minutesAmount"
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

        <S.StartCountdownButton type="submit" disabled>
          Começar <Play size={24} />
        </S.StartCountdownButton>
      </S.Form>
    </S.HomeContainer>
  );
}
