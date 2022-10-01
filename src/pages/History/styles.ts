import styled, { css } from 'styled-components';

export const HistoryContainer = styled.main`
  height: 100%;
  padding: 5.6rem;

  flex: 1;
  display: flex;
  flex-direction: column;

  h1 {
    font-size: 2.4rem;
    color: ${({ theme }) => theme.colors.gray[100]};
  }
`;

export const HistoryList = styled.div`
  max-height: 100%;
  margin-top: 3.2rem;

  flex: 1;

  overflow: auto;
`;

export const Table = styled.table`
  ${({ theme }) => css`
    width: 100%;
    max-height: 100%;
    min-width: 600px;
    border-collapse: collapse;

    th {
      padding: 1.6rem;

      line-height: 1.6;
      text-align: left;
      font-size: 1.4rem;
      color: ${theme.colors.gray[100]};
      background-color: ${theme.colors.gray[600]};

      &:first-child {
        padding-right: 2.4rem;
        border-top-left-radius: 8px;
      }

      &:last-child {
        padding-left: 2.4rem;
        border-top-right-radius: 8px;
      }
    }

    td {
      padding: 1.6rem;
      border-top: 4px solid ${theme.colors.gray[700]};

      line-height: 1.6;
      font-size: 1.4rem;
      background-color: ${theme.colors.gray[700]};

      &:first-child {
        width: 50%;
        padding-right: 2.4rem;
      }

      &:last-child {
        padding-left: 2.4rem;
      }
    }
  `}
`;

interface StatusProps {
  statusColor: 'yellow' | 'red' | 'green';
}

export const Status = styled.span<StatusProps>`
  ${({ theme, statusColor }) => css`
    gap: 0.8rem;
    display: flex;
    align-items: center;

    ::before {
      content: '';
      width: 0.8rem;
      height: 0.8rem;
      border-radius: 50%;

      background-color: ${theme.colors[statusColor][500]};
    }
  `}
`;
