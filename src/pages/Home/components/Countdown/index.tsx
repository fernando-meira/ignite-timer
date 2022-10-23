import * as S from './styles';

export function Countdown() {
  return (
    <S.CountdownContainer>
      <S.CountdownItem>0</S.CountdownItem>
      <S.CountdownItem>0</S.CountdownItem>

      <S.Separator>:</S.Separator>

      <S.CountdownItem>0</S.CountdownItem>
      <S.CountdownItem>0</S.CountdownItem>
    </S.CountdownContainer>
  );
}
