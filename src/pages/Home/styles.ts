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

export const FormContainer = styled.div`
  width: 100%;

  gap: 0.8rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;

  font-size: 1.8rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.gray[100]};
`;

const BaseInput = styled.input<{ hasError?: boolean }>`
  ${({ theme, hasError }) => css`
    border: 0;
    height: 4rem;
    padding: 0 0.8rem;
    border-bottom: 2px solid ${theme.colors.gray[500]};

    font-weight: bold;
    font-size: 1.8rem;
    background: transparent;
    color: ${theme.colors.gray[100]};

    &:focus {
      box-shadow: none;
      border-color: ${theme.colors.green[500]};
    }

    &::placeholder {
      color: ${theme.colors.gray[500]};
    }

    border-bottom: 1px solid
      ${hasError ? theme.colors.red[500] : theme.colors.white};
  `}
`;

export const TaskInput = styled(BaseInput)`
  flex: 1;

  &::-webkit-calendar-picker-indicator {
    display: none !important;
  }
`;

export const MinutesAmountInput = styled(BaseInput)`
  width: 6.4rem;
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
