import styled, { css } from 'styled-components';

export const HomeContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

export const Form = styled.form`
  flex: 1;
  gap: 3.5rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
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

const BaseInput = styled.input`
  ${({ theme }) => css`
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

export const CountdownContainer = styled.div`
  gap: 1.6rem;
  display: flex;

  font-size: 16rem;
  line-height: 12.8rem;
  font-family: 'Roboto Mono', monospace;
  color: ${({ theme }) => theme.colors.gray[100]};
`;

export const CountdownItem = styled.span`
  border-radius: 8px;
  padding: 3.2rem 1.6rem;

  background-color: ${({ theme }) => theme.colors.gray[700]};
`;

export const Separator = styled.div`
  width: 6.4rem;
  padding: 3.2rem 0;

  display: flex;
  justify-content: center;

  overflow: hidden;
  color: ${({ theme }) => theme.colors.green[500]};
`;

export const StartCountdownButton = styled.button`
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
  background-color: ${({ theme }) => theme.colors.green[500]};

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    background-color: ${({ theme }) => theme.colors.green[700]};
  }
`;
