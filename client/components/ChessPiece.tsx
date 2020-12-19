import * as React from 'react';
import { PieceMapping } from '../helper/pieceMapping';
import { BoardContext } from '../BoardContext';

interface Props {
  // Piece is string like 'WR' to represent the current piece ie white rook
  piece: string;
  // Position is array in form [row, column]
  position: number[];
}

export const ChessPiece: React.FC<Props> = ({ piece, position }) => {
  // State to hold location of all chess pieces
  const [ boardLayout, setBoardLayout ] = React.useContext(BoardContext);
  // Function to handle drag events
  const dragHandler = function(e) {
    e.preventDefault();
    const row: number = position[0];
    const col: number = position[1];
    // Place piece in new position for new layout
    const oldLayout: string[][] = [...boardLayout];
    oldLayout[row - 1][col] = oldLayout[row][col];
    oldLayout[row][col] = null;
    setBoardLayout(oldLayout);
  }
  return (
    <img
      src={PieceMapping[piece]}
      alt={`${piece}`}
      className='chess-piece'
      draggable='true'
      onDrag={(e) => dragHandler(e)}
    ></img>
  );
};
