import styled, { css } from 'styled-components';

export const LayoutContainer = styled.div`
  ${({ theme }) => css`
    padding: 3rem;
    margin: 8rem auto;
    border-radius: 8px;
    max-width: 118.4rem;
    height: calc(100vh - 16rem);

    display: flex;
    flex-direction: column;

    background-color: ${theme.colors.gray[800]};
  `}
`;
