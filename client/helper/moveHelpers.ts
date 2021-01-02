/* File with helper functions to move pieces, promote pieces, determine if game was lost etc. */
import { LayoutType } from './types';

export const movePiece = function(
  piece: string,
  positionFrom: number[], // same as before, in format [row, col]
  positionTo: number[], // [row, col]
  boardLayout: LayoutType
): LayoutType {
  // Get copy of board layout to return 
  const layout = [...boardLayout];
  // Get row and column from position
  const rowFrom: number = positionFrom[0];
  const colFrom: number = positionFrom[1];
  // Get row and column piece is moving to
  const rowTo: number = positionTo[0];
  const colTo: number = positionTo[1];
  // Color for players side is either 'W' for white or 'B' for black
  const side: string = piece[0];
  // Define the kind of piece being used
  let chessPiece: string;
  if (piece[1] === 'K') chessPiece = 'KING';
  else if (piece[1] === 'Q') chessPiece = 'QUEEN';
  else if (piece[1] === 'R') chessPiece = 'ROOK';
  else if (piece[1] === 'B') chessPiece = 'BISHOP';
  else if (piece[1] === 'N') chessPiece = 'KNIGHT';
  else if (piece[1] === 'P') chessPiece = 'PAWN';
  // Take the piece in the rowTo, colTo and replace old position with null
  layout[rowTo][colTo] = piece;
  layout[rowFrom][colFrom] = null;
  // If the piece is a pawn and makes it to the other end of the board, promote it to a queen (will change to users choice later)
  if (chessPiece === 'PAWN' && rowTo === 0) {
    layout[rowTo][colTo] = side + 'Q';
  }
  // Return modified layout
  return layout;
}