// Function that generates a string for the history board and pushes it to the end of history, ie Nf6
import { deepCopyHistory } from './deepCopy';
import { HistoryType, LayoutType, MoveHistoryType, SideType } from './types';
import { getPossibleMoves } from './possibleMoves';
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

export const generateHistory = function(boardLayout: LayoutType, history: HistoryType, side: SideType, piece: string, to: number[], from: number[], captured: boolean): HistoryType {
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
  // Add + if move put opposite king in check
  if (inCheck(boardLayout, side, piece, to)) moveString += '+';
  // If the move involved castling, change move string to reflect that
  if (pieceCastled(side, piece, to, from)) moveString = pieceCastled(side, piece, to, from);  
  // Set piece of move history to the move string
  moveHistory.move = moveString;
  // Push to history copy
  historyCopy.push(moveHistory);
  return historyCopy;
}

// Helper to determine whether a move involved castling or not, returns empty string if no castling
const pieceCastled = function(side: SideType, piece: string, to: number[], from: number[]): string {
  // Initialize whether piece castled to false
  let castled: string = '';
  // Get row and column to and from
  const rowTo: number = to[0];
  const colTo: number = to[1];
  const colFrom: number = from[1];
  // Castling white side
  if (side === SideType.White && piece[1] === 'R' && rowTo === 7 && colTo === 4) {
    // Castling from left rook/queenside
    if (colFrom === 0) {
      castled = 'O-O-O'
    }
    // Castling from right rook/kingside
    else if (colFrom === 7) {
      castled = 'O-O'
    }
  }
  // Castling black side
  else if (side === SideType.Black && piece[1] === 'R' && rowTo === 7 && colTo === 3) {
    // Castling from left rook/kingside
    if (colFrom === 0) {
      castled = 'O-O'
    }
    // Castling from right rook/queenside
    else if (colFrom === 7) {
      castled = 'O-O-O'
    }
  }

  // Return whether the piece castled
  return castled;
}

// Helper to determine whether a move put the opponent's king in check
const inCheck = function(boardLayout: LayoutType, side: SideType, piece: string, to: number[]): boolean {
  // Determine opponent's side
  const opponent: SideType = side === SideType.White ? SideType.Black : SideType.White;
  // King's piece string
  const kingPiece: string = opponent + 'K0';
  // Search the board to find the opponent's king position
  let kingPosition: number[] = [];
  for (let i = 0; i < boardLayout.length; i += 1) {
    for (let j = 0; j < boardLayout[i].length; j += 1) {
      if (boardLayout[i][j] === kingPiece) {
        kingPosition = [i, j];
        break;
      }
    }
  }
  // Generate possible moves and see if it includes the king position
  const possibleMoves: number[][] = getPossibleMoves(piece, to, boardLayout);
  let checked: boolean = false;
  for (let w = 0; w < possibleMoves.length; w += 1) {
    if (possibleMoves[w][0] === kingPosition[0] && possibleMoves[w][1] === kingPosition[1]) {
      checked = true;
      break;
    }
  }
  // Return whether the king is in check
  return checked;
}