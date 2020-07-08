import React from 'react';
import './global.scss'

import { MainPanel } from './views';
import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import { Theme } from './theme';
import {
  Match,
  Store,
  Management,
} from './PotatosComponents';

function App() {

  return (
    <>
    <div className="App" >
      <header className="App-header" position = 'absolute'>
      </header>
    </div>
    <div>
    <Store></Store>
    <br></br>
    <Match></Match>
    <br></br>
    <Management></Management>
    <br></br>
    </div>
    </>
  );
}

export default App;
