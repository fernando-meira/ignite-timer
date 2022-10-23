import styled, { css } from 'styled-components';

const mediaQueries = css`
  @media (max-width: 800px) {
    padding: 1.4rem 1rem;

    font-size: 14rem;
  }

  @media (max-width: 600px) {
    padding: 1rem 0.8rem;

    font-size: 10rem;
  }

  @media (max-width: 320px) {
    padding: 1rem 1rem;

    font-size: 5.5rem;
  }
`;

export const CountdownContainer = styled.div`
  width: 100%;

  gap: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  font-size: 16rem;
  line-height: 12.8rem;
  font-family: 'Roboto Mono', monospace;
  color: ${({ theme }) => theme.colors.gray[100]};
`;

export const CountdownItem = styled.span`
  border-radius: 8px;
  padding: 3.2rem 1.6rem;

  background-color: ${({ theme }) => theme.colors.gray[700]};

  ${mediaQueries}
`;

export const Separator = styled.div`
  width: 6.4rem;
  padding: 3.2rem 0;

  display: flex;
  justify-content: center;

  overflow: hidden;
  color: ${({ theme }) => theme.colors.green[500]};

  ${mediaQueries}
`;
