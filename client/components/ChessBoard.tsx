import * as React from 'react';
import { Row } from './Row';
import { BoardContext } from '../BoardContext';
import { ColorLayoutType, SideType } from '../helper/types';

// Structure of color palette objects in colorPalette
export interface Palette {
  dark: string;
  light: string;
}

interface Props {
  paletteIndex: number;
}

export const ChessBoard: React.FC<Props> = ({ paletteIndex }) => {
  // Array to hold 8 chess rows with 8 squares each
  const chessRows = [];
  // Insert 8 rows into chessRows
  for (let i = 0; i < 8; i += 1) {
    // // Determine starting color of current row
    // let startColor: string;
    // if (i % 2 === 0) {
    //   startColor = currentPalette.light;
    // } else startColor = currentPalette.dark;
    // Push the current row to array of rows
    chessRows.push(
      <Row
        rowNumber={i}
        key={`row-${i}`}
      />
    );
  }

  return <div className='chess-board'>{chessRows}</div>;
};
