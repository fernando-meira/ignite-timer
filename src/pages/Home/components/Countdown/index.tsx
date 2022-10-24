import { differenceInSeconds } from 'date-fns';
import { useEffect } from 'react';

import * as S from './styles';

export function Countdown() {
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
          activeCycle.startDate
        );

        if (secondsDifference >= totalSeconds) {
          setCycles((cycles) =>
            cycles.map((cycle) => {
              if (cycle.id === activeCycleId) {
                return { ...cycle, finishedCycleDate: new Date() };
              } else {
                return cycle;
              }
            })
          );

          setAmountSecondsPassed(totalSeconds);
          clearInterval(interval);
        } else {
          setAmountSecondsPassed(secondsDifference);
        }
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [activeCycle, totalSeconds, activeCycleId]);

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
