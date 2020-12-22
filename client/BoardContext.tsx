// Context to hold state information about current board layour
import * as React from 'react';
// Type of context
// export type BoardContextType = {
//   boardLayout: string[][];
//   // setBoardLayout: (Layout: string[][]) => void;
// };
// Create context with default as white board and function that returns a console log
export const BoardContext = React.createContext(undefined);
// Custom Hook to let users change board layout
export const useLayout = () => React.useContext(BoardContext);
