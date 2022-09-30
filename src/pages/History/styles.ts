import styled, { css } from 'styled-components';

export const HistoryContainer = styled.main`
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
  margin-top: 3.2rem;

  flex: 1;

  overflow: auto;
`;

export const Table = styled.table`
  ${({ theme }) => css`
    width: 100%;
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
