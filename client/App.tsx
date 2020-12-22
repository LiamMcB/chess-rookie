import * as React from 'react';
import { Nav } from './components/Nav';
import { Main } from './components/Main';
import { BoardContext } from './BoardContext';
import { defaultWhiteBoard } from './helper/defaultBoard';

export const App: React.FC = () => {
  const [ boardLayout, setBoardLayout ] = React.useState<string[][]>([...defaultWhiteBoard]);
  // const [ state, dispatch ] = React.useReducer((state: string[][], action) => {
  //   switch(action.type) {
  //     case 'RESET_BOARD':
  //       return defaultWhiteBoard;
  //   }
  // }, defaultWhiteBoard);
  return (
    <BoardContext.Provider value={{boardLayout, setBoardLayout}}>
      <Nav />
      <Main />
    </BoardContext.Provider>
  );
};