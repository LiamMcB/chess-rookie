import * as React from 'react';
import { Palette } from './ChessBoard';
import { ChessSquare } from './ChessSquare';

interface Props {
  startColor: string;
  currentPalette: Palette;
  rowNumber: number;
}

export const Row: React.FC<Props> = ({ startColor, currentPalette, rowNumber }) => {
  // Variable to hold color of square
  let currentColor: string = startColor;
  // Array to hold 8 chess rows
  const chessSquares = [];
  // Populate rows with 8 chess squares each
  for (let i = 0; i < 8; i += 1) {
    chessSquares.push(<ChessSquare squareColor={currentColor} piece={[rowNumber, i]} key={`square-${rowNumber}-${i}`} />);
    currentColor = currentColor === currentPalette.dark ? currentPalette.light : currentPalette.dark; 
  }

  return (
    <div className='chess-row'>
      {chessSquares}
    </div>
  )
}