import * as React from 'react';
import { ChessSquare } from './ChessSquare';

interface Props {
  startColor: string;
}

export const Row: React.FC<Props> = ({ startColor }) => {
  // Variable to hold color of square
  let currentColor: string = startColor;
  // Array to hold 8 chess rows
  const chessSquares = [];
  // Populate rows with 8 chess squares each
  for (let i = 0; i < 8; i += 1) {
    chessSquares.push(<ChessSquare squareColor={currentColor} />);
    currentColor = currentColor === 'black' ? 'white' : 'black'; 
  }

  return (
    <div className='chess-row'>
      {chessSquares}
    </div>
  )
}