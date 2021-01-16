// Function that generates a string for the history board and pushes it to the end of history, ie Nf6
import { deepCopyHistory } from './deepCopy';
import { HistoryType, MoveHistoryType, SideType } from './types';
// Map from column to letters
const letterMap = new Map();
letterMap.set(0, 'a');
letterMap.set(1, 'b');
letterMap.set(2, 'c');
letterMap.set(3, 'd');
letterMap.set(4, 'e');
letterMap.set(5, 'f');
letterMap.set(6, 'g');
letterMap.set(7, 'h');

export const generateHistory = function(history: HistoryType, side: SideType, piece: string, to: number[], captured: boolean): HistoryType {
  // Make copy of history
  const historyCopy = deepCopyHistory(history);
  // Initialize object to hold move string and side
  const moveHistory: MoveHistoryType = {side, move: ''};
  // If piece is pawn, don't preface move with capital letter for piece, otherwise do
  let moveString: string = piece[1] === 'P' ? '' : piece[1];
  // If the piece captured another, add x 
  if (captured) moveString += 'x';
  // Add string for position moving to
  moveString += letterMap.get(to[1]) + to[0];
  // Set piece of move history to the move string
  moveHistory.move = moveString;
  // Push to history copy
  historyCopy.push(moveHistory);
  return historyCopy;
}
