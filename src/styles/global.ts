import { createGlobalStyle, css } from 'styled-components';

export default createGlobalStyle`
  * {
    margin:0;
    padding: 0;
    box-sizing: border-box;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
  }

  ${({ theme }) => css`
    html {
      font-size: 62.5%;
    }

    body {
      background: ${theme.colors.primary};
      font-size: ${theme.font.sizes.medium};
      font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI',
        Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
        sans-serif;
    }

    button {
      cursor: pointer;
    }
  `}
`;
