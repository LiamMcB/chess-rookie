import * as React from 'react';
import { Nav } from './components/Nav';
import { Main } from './components/Main';

export const App: React.FC = () => {
  return (
    <React.Fragment>
      <Nav />
      <Main />
    </React.Fragment>
  )
}