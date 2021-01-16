import * as React from 'react';
import { BoardContext } from '../BoardContext';
import { Entry } from './Entry';

export const History: React.FC = () => {
  const { state, dispatch } = React.useContext(BoardContext);
  // Iterate over all history entries and create new component for each
  const entries = [];
  state.history.forEach((entry, index) => {
    entries.push(<Entry moveHistory={entry} entryIndex={index} key={`entry-${index}`}/>)
  })
  return (
    <div className='history-container'>
      <h3 className='history-title'>History</h3>
      {entries}
    </div>
  )
}