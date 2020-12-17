import * as React from 'react';
const KingSVG = 'https://upload.wikimedia.org/wikipedia/commons/f/f0/Chess_kdt45.svg';

export const ChessPiece: React.FC = () => {
  return (
    <img src={KingSVG} alt='King' className='chess-piece'></img>
  )
}