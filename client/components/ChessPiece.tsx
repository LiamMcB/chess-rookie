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
  // State to handle dispatching actions to reducer in context
  const { state, dispatch } = React.useContext(BoardContext);
  // Function to handle drag events
  const dragHandler = function(e) {
    e.preventDefault();
    dispatch({ type: 'MOVE_PIECE', payload: {piece, to: [position[0] + 1, position[1] + 1], from: [...position]} });
  }
  return (
    <img
      src={PieceMapping[piece]}
      alt={`${piece}`}
      className='chess-piece'
      draggable='true'
      onDragEnd={(e) => dragHandler(e)}
    ></img>
  );
};
