import * as React from 'react';
import { ChessBoard } from './ChessBoard';

export const Main: React.FC = () => {
  return (
    <div className='main-container'>
      <button>Play</button>
      <ChessBoard />
    </div>
  )
}