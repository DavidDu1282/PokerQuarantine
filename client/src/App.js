import React from 'react';
import { MainPanel } from './views';
import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import { Theme } from './theme';


import NewsPage from './News/news.js';

function App() {

  return (
    
       
          <ThemeProvider theme={Theme}>
          <CssBaseline />
          
          
          <NewsPage></NewsPage>
          </ThemeProvider>
    

  );
};

export default App;
