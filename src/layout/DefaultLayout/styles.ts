import styled, { css } from 'styled-components';

export const LayoutContainer = styled.div`
  ${({ theme }) => css`
    width: 90%;
    padding: 3rem;
    margin: 8rem auto;
    border-radius: 8px;
    max-width: 118.4rem;
    height: calc(100vh - 16rem);

    display: flex;
    flex-direction: column;

    background-color: ${theme.colors.gray[800]};

    @media (max-width: 320px) {
      height: auto;
      padding: 1rem;
      margin: 2rem auto;
    }
  `}
`;
