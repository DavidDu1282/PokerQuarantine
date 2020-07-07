import React from 'react';
import { MainPanel } from './views';
import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import { Theme } from './theme';


import NewsPage from './News/news.js';
import Board from './Leaderboard/leaderboard.js'

function App() {

  return (
    
       
          <ThemeProvider theme={Theme}>
          <CssBaseline />
          
          <Board></Board>
          </ThemeProvider>
    

  );
};

export default App;
