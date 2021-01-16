import * as React from 'react';
import { MoveHistoryType } from '../helper/types';

interface Props {
  moveHistory: MoveHistoryType;
}

export const Entry: React.FC<Props> = ({ moveHistory }) => {
  return (
    <div className='history-entry'>
      Side: {moveHistory.side}, Move: {moveHistory.move}
    </div>
  )
}