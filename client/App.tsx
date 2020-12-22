import * as React from 'react';
import { Nav } from './components/Nav';
import { Main } from './components/Main';
import { BoardContext } from './BoardContext';
import { defaultWhiteBoard, LayoutType } from './helper/defaultBoard';
import { boardReducer } from './helper/boardReducer';

// Defines structure of state object
export interface StateType {
  boardLayout: LayoutType;
}

export const App: React.FC = () => {
  // Default state object
  const defaultState: StateType = {
    boardLayout: [
      ['BR', 'BN', 'BB', 'BQ', 'BK', 'BB', 'BN', 'BR'],
      ['BP', 'BP', 'BP', 'BP', 'BP', 'BP', 'BP', 'BP'],
      Array(8).fill(null),
      Array(8).fill(null),
      Array(8).fill(null),
      Array(8).fill(null),
      ['WP', 'WP', 'WP', 'WP', 'WP', 'WP', 'WP', 'WP'],
      ['WR', 'WN', 'WB', 'WQ', 'WK', 'WB', 'WN', 'WR']
    ]
  } 
  // Reducer hook which bundles state-changing functionality
  const [ state, dispatch ] = React.useReducer(boardReducer, defaultState);
  return (
    <BoardContext.Provider value={{state, dispatch}}>
      <Nav />
      <Main />
    </BoardContext.Provider>
  );
};