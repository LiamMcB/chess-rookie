import * as React from 'react';
import { Nav } from './components/Nav';
import { Main } from './components/Main';
import { BoardContext } from './BoardContext';
import { defaultWhiteBoard } from './helper/defaultBoard';
import { boardReducer } from './helper/boardReducer';

export const App: React.FC = () => {
  const [ state, dispatch ] = React.useReducer(boardReducer, defaultWhiteBoard);
  return (
    <BoardContext.Provider value={{state, dispatch}}>
      <Nav />
      <Main />
    </BoardContext.Provider>
  );
};