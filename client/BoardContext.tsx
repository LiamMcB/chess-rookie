// Context to hold state information about current board layour
import * as React from 'react';
import { defaultBlackBoard, defaultWhiteBoard } from './helper/defaultBoard';
// Type of context
export type BoardContextType = {
  boardLayout: string[][];
  setBoardLayout: (Layout: string[][]) => void;
};
// Create context with default as white board and function that returns a console log
export const BoardContext = React.createContext<BoardContextType>({
  boardLayout: [...defaultWhiteBoard],
  setBoardLayout: () => console.log('No layout provided'),
});
// Custom Hook to let users change board layout
export const useLayout = () => React.useContext(BoardContext);
