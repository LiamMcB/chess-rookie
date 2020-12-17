import * as React from 'react';

interface Props {
  squareColor: string;
}

export const ChessSquare: React.FC<Props> = ({ squareColor }) => {
  return (
    <div className='chess-square' style={{backgroundColor: squareColor}}>

    </div>
  )
}