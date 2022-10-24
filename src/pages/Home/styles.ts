import styled, { css } from 'styled-components';

export const HomeContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

export const Form = styled.form`
  width: 100%;
  max-width: 65rem;

  flex: 1;
  gap: 3.5rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 600px) {
    margin-top: 4rem;
  }
`;

const BaseCountdownButton = styled.button`
  width: 100%;
  border: none;
  padding: 1.6rem;
  border-radius: 8px;

  gap: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.gray[100]};

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const StartCountdownButton = styled(BaseCountdownButton)`
  background-color: ${({ theme }) => theme.colors.green[500]};

  &:not(:disabled):hover {
    background-color: ${({ theme }) => theme.colors.green[700]};
  }
`;

export const StopCountdownButton = styled(BaseCountdownButton)`
  background-color: ${({ theme }) => theme.colors.red[500]};

  &:not(:disabled):hover {
    background-color: ${({ theme }) => theme.colors.red[700]};
  }
`;
