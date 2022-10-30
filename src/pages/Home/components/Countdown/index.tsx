import { useContext, useEffect } from 'react';
import { differenceInSeconds } from 'date-fns';

import * as S from './styles';
import { CyclesContext } from '../../../../context/CyclesContext';

export function Countdown() {
  const {
    activeCycle,
    activeCycleId,
    setSecondsPassed,
    amountSecondsPassed,
    markCurrentCycleAsFinished,
  } = useContext(CyclesContext);

  const totalSeconds = !!activeCycle ? activeCycle.minutesAmount * 60 : 0;
  const currentSeconds = !!activeCycle ? totalSeconds - amountSecondsPassed : 0;

  const secondsAmount = currentSeconds % 60;
  const minutesAmount = Math.floor(currentSeconds / 60);

  const minutes = String(minutesAmount).padStart(2, '0');
  const seconds = String(secondsAmount).padStart(2, '0');

  useEffect(() => {
    let interval: number;

    if (!!activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          new Date(activeCycle.startDate)
        );

        if (secondsDifference >= totalSeconds) {
          clearInterval(interval);
          setSecondsPassed(totalSeconds);

          markCurrentCycleAsFinished();
        } else {
          setSecondsPassed(secondsDifference);
        }
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [
    activeCycle,
    totalSeconds,
    activeCycleId,
    setSecondsPassed,
    markCurrentCycleAsFinished,
  ]);

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`;
    }
  }, []);

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
