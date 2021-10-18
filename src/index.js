import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Game from './component/Game';

ReactDOM.render(
  <React.StrictMode>
    <Game
    col={20}
    row={20}
    numStep={5}
     />
  </React.StrictMode>,
  document.getElementById('root')
);

