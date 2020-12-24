/* File with helper functions that return array of indices for reducer to highlight */
import { LayoutType } from './types';

// Function that checks what kind of piece is passed in and highlights accordingly (checking if same side's pieces there)
export const highlight = (
  piece: string,
  position: number[],
  boardLayout: LayoutType
): number[][] => {
  // Get row and column from position
  const row: number = position[0];
  const col: number = position[1];
  // Initialize piece variable and array to hold highlight indices in form [row, column]
  const highlightIndices: number[][] = [];
  let chessPiece: string;
  // Not on board is undefined, an empty square is null
  const emptySquare: null = null;
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
  // UNDEFINED IS FOR SQUARE NOT ON BOARD AND NULL IS FOR EMPTY SQUARE
  if (chessPiece === 'KING') {
    // Top
    if (canMove(piece, [row - 1, col], boardLayout, side)) {
      highlightIndices.push([row - 1, col]);
    }
    // TR
    if (canMove(piece, [row - 1, col], boardLayout, side)) {
      highlightIndices.push([row - 1, col + 1]);
    }
    // Right
    if (canMove(piece, [row, col + 1], boardLayout, side)) {
      highlightIndices.push([row, col + 1]);
    }
    // BR
    if (canMove(piece, [row + 1, col + 1], boardLayout, side)) {
      highlightIndices.push([row + 1, col + 1]);
    }
    // Bottom
    if (canMove(piece, [row + 1, col], boardLayout, side)) {
      highlightIndices.push([row + 1, col]);
    }
    // BL
    if (canMove(piece, [row + 1, col - 1], boardLayout, side)) {
      highlightIndices.push([row + 1, col - 1]);
    }
    // Left
    if (canMove(piece, [row, col - 1], boardLayout, side)) {
      highlightIndices.push([row, col - 1]);
    }
    // TL
    if (canMove(piece, [row - 1, col - 1], boardLayout, side)) {
      highlightIndices.push([row - 1, col - 1]);
    }
  }
  // Pawns move one square forward
  else if (chessPiece === 'PAWN') {
    // Top
    if (canMove(piece, [row - 1, col], boardLayout, side)) {
      highlightIndices.push([row - 1, col]);
    }
  }

  return highlightIndices;
};

// Helper function that checks if the piece can move to an index
const canMove = function (
  piece: string,
  position: number[],
  boardLayout: LayoutType,
  side: string
): boolean {
  // Row and coulmn moving to
  const rowTo = position[0];
  const colTo = position[1];
  // Initialize if piece can move to false and conditionally check if it is true
  let pieceCanMove = false;
  // Run conditional check if position moving to is null or has piece from other side
  if (
    boardLayout[rowTo] &&
    (boardLayout[rowTo][colTo] === null ||
      (boardLayout[rowTo][colTo] && boardLayout[rowTo][colTo][0] !== side))
  ) {
    pieceCanMove = true;
  }
  return pieceCanMove;
};
