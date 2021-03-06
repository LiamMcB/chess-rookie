import * as React from 'react';
import { PieceMapping } from '../constants/pieceMapping';
import { BoardContext } from '../BoardContext';
import e = require('express');

interface Props {
  // Piece is string like 'WR' to represent the current piece ie white rook
  piece: string;
  // Position is array in form [row, column]
  position: number[];
}

export const ChessPiece: React.FC<Props> = ({ piece, position }) => {
  // State to handle dispatching actions to reducer in context
  const { dispatch } = React.useContext(BoardContext);
  // State to manage whether squares get highlighted or unhighlighted
  const [ highlighted, setHighlighted ] = React.useState(false);
  // Function to show available squares for current piece to move or unhighlight
  const highlightLegalMoves = function(e) {
    e.preventDefault();
    // Unhighlight previously highlighted moves
    dispatch({ type: 'UN_HIGHLIGHT_MOVES', payload: {piece, from: [...position]} });
    // If no squares highlighted, highlight them
    if (!highlighted) dispatch({ type: 'HIGHLIGHT_MOVES', payload: {piece, from: [...position]} });
    // Toggle highlighted so it unhighlights 
    setHighlighted(!highlighted);
  }

  return (
    <img
      src={PieceMapping[piece.substring(0, 2)]}
      alt={`${piece}`}
      className='chess-piece'
      draggable='true'
      onClick={highlightLegalMoves}
    ></img>
  );
};
