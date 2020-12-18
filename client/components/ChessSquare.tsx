import * as React from 'react';
import { ChessPiece } from './ChessPiece';

interface Props {
  squareColor: string;
  piece: string;
}

export const ChessSquare: React.FC<Props> = ({ squareColor, piece }) => {
  return (
    <div className='chess-square' style={{backgroundColor: squareColor}}>
      {/* Only put a piece in position if the piece in position isn't null */}
      {piece && <ChessPiece piece={piece} />}
    </div>
  )
}