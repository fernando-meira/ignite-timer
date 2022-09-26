import styled, { css, DefaultTheme } from 'styled-components';

import { ButtonProps } from '.';

const buttonModifiers = {
  primary: (theme: DefaultTheme) => css`
    color: ${theme.colors.white};
    background-color: ${theme.colors.primary};
  `,
  secondary: (theme: DefaultTheme) => css`
    color: ${theme.colors.white};
    background-color: ${theme.colors.secondary};
  `,
  danger: (theme: DefaultTheme) => css`
    color: ${theme.colors.white};
    background-color: ${theme.colors.red};
  `,
  success: (theme: DefaultTheme) => css`
    color: ${theme.colors.white};
    background-color: ${theme.colors.green};
  `,
};

export const ButtonContainer = styled.button<ButtonProps>`
  ${({ theme, color }) => css`
    ${color && buttonModifiers[color](theme)};
  `}
`;
