import React from 'react';



import {
  Match,
  Store,
  Management,
} from './PotatosComponents';
//import { MainPanel } from './views';
import { CssBaseline, ListSubheader } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import { Theme } from './theme';
//import NewsPage from './News/news.js';

import PlayerInfo from './Info/info.js';
import NewsPage from './News/news';
import Board from './Leaderboard/leaderboard';

//import Board from './Leaderboard/leaderboard.js';


function App() {

  return (

    
       
          <ThemeProvider theme={Theme}>
            
          <CssBaseline />
          <PlayerInfo></PlayerInfo>
         
          </ThemeProvider>
    
  );
};

export default App;
