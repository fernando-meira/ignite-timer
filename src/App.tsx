import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';

import { Router } from './routes/router';
import GlobalStyle from './styles/global';
import { defaultTheme } from './styles/default';

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />

      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ThemeProvider>
  );
}
