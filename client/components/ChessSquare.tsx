import * as React from 'react';
import { ChessPiece } from './ChessPiece';

interface Props {
  squareColor: string;
}

export const ChessSquare: React.FC<Props> = ({ squareColor }) => {
  return (
    <div className='chess-square' style={{backgroundColor: squareColor}}>
      <ChessPiece />
    </div>
  )
}