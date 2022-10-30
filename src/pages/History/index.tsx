import { useContext } from 'react';
import ptBR from 'date-fns/locale/pt-BR';

import { CycleData } from '../../interfaces/Cycles';
import { CyclesContext } from '../../context/CyclesContext';

import * as S from './styles';
import { formatDistanceToNow } from 'date-fns';

export function History() {
  const { cycles } = useContext(CyclesContext);

  const renderStatus = (cycle: CycleData) => {
    if (cycle.finishedCycleDate) {
      return <S.Status statusColor="green">Concluído</S.Status>;
    }

    if (cycle.interruptedCycleDate) {
      return <S.Status statusColor="red">Interrompido</S.Status>;
    }

    return <S.Status statusColor="yellow">Em andamento</S.Status>;
  };

  return (
    <S.HistoryContainer>
      <S.HistoryList>
        <S.Table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>início</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {cycles.map((cycle) => (
              <tr key={cycle.id}>
                <td>{cycle.task}</td>

                <td>{cycle.minutesAmount}</td>

                <td>
                  {formatDistanceToNow(new Date(cycle.startDate), {
                    addSuffix: true,
                    locale: ptBR,
                  })}
                </td>

                <td>{renderStatus(cycle)}</td>
              </tr>
            ))}
          </tbody>
        </S.Table>
      </S.HistoryList>
    </S.HistoryContainer>
  );
}
