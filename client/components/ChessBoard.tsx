import * as React from 'react';
import { Row } from './Row';


export const ChessBoard: React.FC = () => {
  // Array to hold 8 chess rows with 8 squares each
  const chessRows = [];
  // Insert 8 rows into chessRows
  for (let i = 0; i < 8; i += 1) {
    // Determine starting color of current row
    let startColor: string;
    if (i % 2 === 0) {
      startColor = 'white';
    } else startColor = 'black';
    // Push the current row to array of rows
    chessRows.push(<Row startColor={startColor} />);
  }

  return (
    <div className='chess-board'>
      {chessRows}
    </div>
  )
}