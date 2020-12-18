// Context to hold state information about current board layour
import * as React from 'react';
import { defaultBlackBoard, defaultWhiteBoard } from './defaultBoard';
// Create context with default as null (so I can provide an array to value in provider)
export const BoardContext = React.createContext(null);
// Export provider with access to board layout and change board layout functionality
export const BoardContextProvider: React.FC = ({ children }) => {
  // State to hold location of all chess pieces with default as white board
  const [ boardLayout, setBoardLayout ] = React.useState(defaultWhiteBoard);
  return (
    <BoardContext.Provider value={[ boardLayout, setBoardLayout ]}>
      {children}
    </BoardContext.Provider>
  )
}
// Custom Hook to let users change board layout
export const useLayout = () => {
  React.useContext(BoardContext);
}