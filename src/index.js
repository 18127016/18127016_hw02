import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Game from '../src/component/Game'

ReactDOM.render(
  <React.StrictMode>
    <Game
    col={6}
    row={6}
    numStep={5}
     />
  </React.StrictMode>,
  document.getElementById('root')
);

