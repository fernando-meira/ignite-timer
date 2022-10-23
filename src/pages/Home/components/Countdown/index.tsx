import * as S from './styles';

interface CountdownProps {
  minutes: string;
  seconds: string;
}

export function Countdown({ minutes, seconds }: CountdownProps) {
  return (
    <S.CountdownContainer>
      <S.CountdownItem>{minutes[0]}</S.CountdownItem>
      <S.CountdownItem>{minutes[1]}</S.CountdownItem>

      <S.Separator>:</S.Separator>

      <S.CountdownItem>{seconds[0]}</S.CountdownItem>
      <S.CountdownItem>{seconds[1]}</S.CountdownItem>
    </S.CountdownContainer>
  );
}
