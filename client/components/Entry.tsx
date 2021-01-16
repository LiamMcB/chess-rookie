import * as React from 'react';
import { MoveHistoryType } from '../helper/types';

interface Props {
  moveHistory: MoveHistoryType;
  entryIndex: number;
}

export const Entry: React.FC<Props> = ({ moveHistory, entryIndex }) => {
  return (
    <div className='history-entry'>
      {entryIndex + 1}. Side: {moveHistory.side === 'W' ? 'White' : 'Black'}, Move: {moveHistory.move}
    </div>
  )
}