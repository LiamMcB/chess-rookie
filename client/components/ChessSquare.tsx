import * as React from 'react';
import { ChessPiece } from './ChessPiece';
import { useLayout } from '../BoardContext';

interface Props {
  squareColor: string;
  // Piece is array in form [row, column]
  piece: number[];
}

export const ChessSquare: React.FC<Props> = ({ squareColor, piece }) => {
  // State to hold location of all chess pieces
  const { boardLayout, setBoardLayout } = useLayout();
  // Variable to hold string representation of piece in square position
  const currentPiece: string = boardLayout[piece[0]][piece[1]];
  return (
    <div className='chess-square' style={{backgroundColor: squareColor}}>
      {/* Only put a piece in position if the piece in position isn't null */}
      {currentPiece && <ChessPiece piece={currentPiece} position={[...piece]} />}
    </div>
  )
}