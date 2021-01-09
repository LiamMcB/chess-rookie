/* Function that finds all possible moves for a current piece to be used in botHelpers.ts and returns array of [row, col] moves */
// SIMILAR TO HIGHLIGHT FUNCTION IN highlightHelpers.ts, but for the bots moves
import { LayoutType } from "./types";
import { canMove, highlightTop, highlightRight, highlightBottom, highlightLeft, highlightDiagonal, pawnMoveDiagonal } from './highlightHelpers';
import { canCastleBot } from './moveHelpers';

export const getPossibleMoves = function (piece: string, positionFrom: number[], boardLayout: LayoutType): number[][] {
  // Get row and column from position
  const row: number = positionFrom[0];
  const col: number = positionFrom[1];
  // Initialize piece variable and array to hold highlight indices in form [row, column]
  let possibleMoves: number[][] = [];
  // String to represent the allcaps version of our current chess piece
  let chessPiece: string;
  // Color for players side is either 'W' or 'B'
  const side: string = piece[0];
  // Define the kind of piece being used
  if (piece[1] === 'K') chessPiece = 'KING';
  else if (piece[1] === 'Q') chessPiece = 'QUEEN';
  else if (piece[1] === 'R') chessPiece = 'ROOK';
  else if (piece[1] === 'B') chessPiece = 'BISHOP';
  else if (piece[1] === 'N') chessPiece = 'KNIGHT';
  else if (piece[1] === 'P') chessPiece = 'PAWN';
  // Kings can move one space in any direction so long as there isn't a piece of the same color
  if (chessPiece === 'KING') getPossibleMovesKing(row, col, boardLayout, side, possibleMoves);
  // Queens move as many squares in any directions as the user wants
  else if (chessPiece === 'QUEEN') getPossibleMovesQueen(row, col, boardLayout, side, possibleMoves);
  // Rooks move as many squares vertically or horizontally as the user wants
  else if (chessPiece === 'ROOK') getPossibleMovesRook(row, col, boardLayout, side, possibleMoves);
  // Bishops move as many squares diagonally as the user wants
  else if (chessPiece === 'BISHOP') getPossibleMovesBishop(row, col, boardLayout, side, possibleMoves);
  // Knights move in an L-shape, 2 squares one direction and 1 square in the perpendicular direction
  else if (chessPiece === 'KNIGHT') getPossibleMovesKnight(row, col, boardLayout, side, possibleMoves);
  // Pawns move one square forward except for on their first move, where they can move two squares and capture diagonally forward
  else if (chessPiece === 'PAWN') getPossibleMovesPawn(row, col, boardLayout, side, possibleMoves);
  // Return the highlighted indices
  return possibleMoves;
}

// Functions that find the possible moves for each piece
const getPossibleMovesKing = function(row: number, col: number, boardLayout: LayoutType, side: string, possibleMoves: number[][]): void {
  // Top
  if (canMove([row - 1, col], boardLayout, side)) {
    possibleMoves.push([row - 1, col]);
  }
  // TR
  if (canMove([row - 1, col + 1], boardLayout, side)) {
    possibleMoves.push([row - 1, col + 1]);
  }
  // Right
  if (canMove([row, col + 1], boardLayout, side)) {
    possibleMoves.push([row, col + 1]);
  }
  // BR
  if (canMove([row + 1, col + 1], boardLayout, side)) {
    possibleMoves.push([row + 1, col + 1]);
  }
  // Bottom
  if (canMove([row + 1, col], boardLayout, side)) {
    possibleMoves.push([row + 1, col]);
  }
  // BL
  if (canMove([row + 1, col - 1], boardLayout, side)) {
    possibleMoves.push([row + 1, col - 1]);
  }
  // Left
  if (canMove([row, col - 1], boardLayout, side)) {
    possibleMoves.push([row, col - 1]);
  }
  // TL
  if (canMove([row - 1, col - 1], boardLayout, side)) {
    possibleMoves.push([row - 1, col - 1]);
  }
}
const getPossibleMovesQueen = function(row: number, col: number, boardLayout: LayoutType, side: string, possibleMoves: number[][]): void {
  const position = [row, col];
  // Highlight top, right, bottom, left
  highlightTop(position, boardLayout, side, possibleMoves);
  highlightRight(position, boardLayout, side, possibleMoves);
  highlightBottom(position, boardLayout, side, possibleMoves);
  highlightLeft(position, boardLayout, side, possibleMoves);
  // Highlight Diagonally
  highlightDiagonal(position, boardLayout, side, possibleMoves);  
}
const getPossibleMovesRook = function(row: number, col: number, boardLayout: LayoutType, side: string, possibleMoves: number[][]): void {
  const position = [row, col];
  // Highlight top, right, bottom, left
  highlightTop(position, boardLayout, side, possibleMoves);
  highlightRight(position, boardLayout, side, possibleMoves);
  highlightBottom(position, boardLayout, side, possibleMoves);
  highlightLeft(position, boardLayout, side, possibleMoves);
  // CASTLING: Where king and rook swap places, more info in movehelpers
  if (canCastleBot(boardLayout, position, side)) {
    // Depending on side, highlight king's position
    if (side === 'W') possibleMoves.push([0, 4]);
    else if (side === 'B') possibleMoves.push([0, 3]);
  }
}
const getPossibleMovesBishop = function(row: number, col: number, boardLayout: LayoutType, side: string, possibleMoves: number[][]): void {
  const position = [row, col];
  // Highlight Diagonally
  highlightDiagonal(position, boardLayout, side, possibleMoves);  
}
const getPossibleMovesKnight = function(row: number, col: number, boardLayout: LayoutType, side: string, possibleMoves: number[][]): void {
  // TR Up 2 Right 1
  if (canMove([row - 2, col + 1], boardLayout, side)) {
    possibleMoves.push([row - 2, col + 1]);
  }
  // TRR Up 1 Right 2
  if (canMove([row - 1, col + 2], boardLayout, side)) {
    possibleMoves.push([row - 1, col + 2]);
  }
  // BRR Down 1 Right 2
  if (canMove([row + 1, col + 2], boardLayout, side)) {
    possibleMoves.push([row + 1, col + 2]);
  }
  // BR Down 2 Right 1
  if (canMove([row + 2, col + 1], boardLayout, side)) {
    possibleMoves.push([row + 2, col + 1]);
  }
  // BL Down 2 Left 1
  if (canMove([row + 2, col - 1], boardLayout, side)) {
    possibleMoves.push([row + 2, col - 1]);
  }
  // BLL Down 1 Left 2
  if (canMove([row + 1, col - 2], boardLayout, side)) {
    possibleMoves.push([row + 1, col - 2]);
  }
  // TLL Up 1 Left 2
  if (canMove([row - 1, col - 2], boardLayout, side)) {
    possibleMoves.push([row - 1, col - 2]);
  }
  // TL Up 2 Left 1
  if (canMove([row - 2, col - 1], boardLayout, side)) {
    possibleMoves.push([row - 2, col - 1]);
  }
}
const getPossibleMovesPawn = function(row: number, col: number, boardLayout: LayoutType, side: string, possibleMoves: number[][]): void {
  // Top
  if (canMove([row + 1, col], boardLayout, side) && !boardLayout[row + 1][col]) {
    possibleMoves.push([row + 1, col]);
  }
  // TR Capture
  if (canMove([row + 1, col + 1], boardLayout, side) && pawnMoveDiagonal(boardLayout, [row + 1, col + 1], side)) {
    possibleMoves.push([row + 1, col + 1]);
  }
  // TL Capture
  if (canMove([row + 1, col - 1], boardLayout, side) && pawnMoveDiagonal(boardLayout, [row + 1, col - 1], side)) {
    possibleMoves.push([row + 1, col - 1]);
  }
  // If pawn's first move, highlight one additional square
  if (canMove([row + 2, col], boardLayout, side) && row === 1 && !boardLayout[row + 2][col]) {
    possibleMoves.push([row + 2, col]);
  }
}