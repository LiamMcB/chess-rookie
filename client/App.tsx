import * as React from 'react';
import { Nav } from './components/Nav';
import { Main } from './components/Main';
import { BoardContextProvider } from './BoardContext';

export const App: React.FC = () => {
  return (
    <BoardContextProvider>
      <Nav />
      <Main />
    </BoardContextProvider>
  )
}