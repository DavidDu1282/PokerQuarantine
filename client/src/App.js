import React from 'react';
import { MainPanel } from './views';
import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import { Theme } from './theme';

function App() {

  return (
    <ThemeProvider theme={Theme}>
    <CssBaseline />
      <MainPanel />
    </ThemeProvider>
  );
}

export default App;
