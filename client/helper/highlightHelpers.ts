/* File with helper functions that return array of indices for reducer to highlight */
import { LayoutType } from './types';

// Function that checks what kind of piece is passed in and highlights accordingly (checking if same side's pieces there)
export const highlight = (piece: string, position: number[], boardLayout: LayoutType): number[][] => {
  // Get row and column from position
  const row: number = position[0];
  const col: number = position[1];
  // Initialize piece variable and array to hold highlight indices 
  const highlightIndices: number[][] = [];
  let chessPiece: string;
  // Color for players side is either 'W' or 'B'
  const side: string = piece[0];
  // Define the kind of piece being used
  if (piece[1] === 'K') chessPiece='KING';
  else if (piece[1] === 'Q') chessPiece='QUEEN';
  else if (piece[1] === 'R') chessPiece='ROOK';
  else if (piece[1] === 'B') chessPiece='BISHOP';
  else if (piece[1] === 'N') chessPiece='KNIGHT';
  else if (piece[1] === 'P') chessPiece='PAWN';
  // Kings can move one space in any direction so long as there isn't a piece of the same color
  if (chessPiece === 'KING') {
    // Top
    if (boardLayout[row - 1] && boardLayout[row - 1][col] && boardLayout[row - 1][col][0] !== side) {
      highlightIndices.push([[row - 1][col]])
    }
    // TR
    if (boardLayout[row - 1] && boardLayout[row - 1][col + 1] && boardLayout[row - 1][col + 1][0] !== side) {
      highlightIndices.push([[row - 1][col + 1]])
    }
    // Right
    if (boardLayout[row][col + 1] && boardLayout[row][col + 1][0] !== side) {
      highlightIndices.push([[row][col + 1]])
    }
    // BR
    if (boardLayout[row + 1] && boardLayout[row + 1][col + 1] && boardLayout[row + 1][col + 1][0] !== side) {
      highlightIndices.push([[row + 1][col + 1]])
    }
    // Bottom
    if (boardLayout[row + 1] && boardLayout[row + 1][col] && boardLayout[row + 1][col][0] !== side) {
      highlightIndices.push([[row + 1][col]])
    }
    // BL
    if (boardLayout[row + 1] && boardLayout[row + 1][col - 1] && boardLayout[row + 1][col - 1][0] !== side) {
      highlightIndices.push([[row + 1][col - 1]])
    }
    // Left
    if (boardLayout[row][col - 1] && boardLayout[row][col - 1][0] !== side) {
      highlightIndices.push([[row][col - 1]])
    }
    // TL
    if (boardLayout[row - 1] && boardLayout[row - 1][col - 1] && boardLayout[row - 1][col - 1][0] !== side) {
      highlightIndices.push([[row - 1][col - 1]])
    }
  }

  return [];
}  