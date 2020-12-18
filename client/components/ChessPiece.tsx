import * as React from 'react';
const KingSVG = 'https://upload.wikimedia.org/wikipedia/commons/f/f0/Chess_kdt45.svg';
import { PieceMapping } from '../defaultBoard';

interface Props {
  piece: string;
}

export const ChessPiece: React.FC<Props> = ({ piece }) => {
  return (
    <img src={PieceMapping[piece]} alt={`${piece}`} className='chess-piece'></img>
  )
}