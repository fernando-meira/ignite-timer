import * as S from './styles';

export function History() {
  return (
    <S.HistoryContainer>
      <h1>Meu histórico</h1>

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
            {Array.from({ length: 8 }).map((_, index) => (
              <tr key={index}>
                <td>Tarefa</td>
                <td>20 minutos</td>
                <td>Há 2 meses</td>
                <td>
                  <S.Status statusColor={index % 2 ? 'green' : 'yellow'}>
                    {index % 2 ? 'Concluído' : 'Em Andamento'}
                  </S.Status>
                </td>
              </tr>
            ))}
          </tbody>
        </S.Table>
      </S.HistoryList>
    </S.HistoryContainer>
  );
}
