import * as React from 'react';
import { PieceMapping } from '../defaultBoard';

interface Props {
  piece: string;
  setBoardLayout: React.Dispatch<React.SetStateAction<string[][]>>;
}

export const ChessPiece: React.FC<Props> = ({ piece }) => {
  return (
    <img src={PieceMapping[piece]} alt={`${piece}`} className='chess-piece' draggable='true'></img>
  )
}