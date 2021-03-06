/* File with helper functions to move pieces, promote pieces, determine if game was lost etc. */
import { deepCopyArray, deepCopyPieces } from './deepCopy';
import { AvailablePiecesType, LayoutType, SideType } from './types';
// Function to move the user's pieces
export const movePiece = function (
  piece: string,
  positionFrom: number[], // same as before, in format [row, col]
  positionTo: number[], // [row, col]
  boardLayout: LayoutType,
  userPieces: AvailablePiecesType
): LayoutType {
  // Get copy of board layout to return
  const layout = deepCopyArray(boardLayout);
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
  // CASTLING: If the piece is a rook and there are no pieces inbetween it and the king, it can castle, or swap into adjacent spots
  let castled: boolean = false;
  if (chessPiece === 'ROOK' && rowFrom === 7) {
    if (canCastle(boardLayout, positionFrom, side)) {
      // If the user clicks on the kings square, they will castle
      if (side === 'W' && rowTo === 7 && colTo === 4) {
        // Set castled to true
        castled = true;
        // Castling from left rook
        if (colFrom === 0) {
          layout[7][3] = piece;
          layout[7][2] = 'WK0';
        }
        // Castling from right rook
        else if (colFrom === 7) {
          layout[7][5] = piece;
          layout[7][6] = 'WK0';
        }
        // Reset old positions
        layout[rowFrom][colFrom] = null;
        layout[7][4] = null;
      }
      // Castling black side
      else if (side === 'B' && rowTo === 7 && colTo === 3) {
        // Set castled to true
        castled = true;
        // Castling from left rook
        if (colFrom === 0) {
          layout[7][2] = piece;
          layout[7][1] = 'BK0';
        }
        // Castling from right rook
        else if (colFrom === 7) {
          layout[7][4] = piece;
          layout[7][5] = 'BK0';
        }
        // Reset old positions
        layout[rowFrom][colFrom] = null;
        layout[7][3] = null;
      }
    }
  }
  // MOVES PIECE WHEN NOT CASTLING Take the piece in the rowTo, colTo and replace old position with null if we haven't castled
  if (!castled) {
    layout[rowTo][colTo] = piece;
    layout[rowFrom][colFrom] = null;
  }
  // If the piece is a pawn and makes it to the other end of the board, promote it to a queen (will change to users choice later)
  if (chessPiece === 'PAWN' && rowTo === 0) {
    // Count number of queens the user has, set the promoted queen to side + Q + that number
    const numQueens = countQueens(userPieces);
    layout[rowTo][colTo] = side + 'Q' + numQueens;
  }
  // Return modified layout
  return layout;
};

// Function to check if empty spaces between rook and king -- FOR CASTLING
export const canCastle = function (
  boardLayout: LayoutType,
  positionFrom: number[],
  side: string
) {
  // If the rook isnt in original position, return false, only need columns since checked rows to invoke this function
  if (positionFrom[1] !== 0 && positionFrom[1] !== 7) return false;
  // If the king isnt in original position, return false (position differs by side)
  if ((boardLayout[7][4] !== 'WK0' && side === 'W') || (boardLayout[7][3] !== 'BK0' && side === 'B')) return false;
  // If rook is in leftmost position
  if (positionFrom[1] === 0) {
    // Check that there are no pieces between rook and king
    if (side === 'W' && (boardLayout[7][1] || boardLayout[7][2] || boardLayout[7][3])) return false;
    else if (side === 'B' && (boardLayout[7][1] || boardLayout[7][2])) return false;
    else return true;
  }
  // If rook is in rightmost position
  if (positionFrom[1] === 7) {
    // Check that there are no pieces between rook and king
    if (side === 'W' && (boardLayout[7][6] || boardLayout[7][5])) return false;
    else if (side === 'B' && (boardLayout[7][6] || boardLayout[7][5] || boardLayout[7][4])) return false;
    else return true;
  }
};

// Function to move the BOT's pieces
export const movePieceBot = function (
  piece: string,
  positionFrom: number[], // same as before, in format [row, col]
  positionTo: number[], // [row, col]
  boardLayout: LayoutType,
  botPieces: AvailablePiecesType
): LayoutType {
  // Get copy of board layout to return
  const layout = deepCopyArray(boardLayout);
  // Get row and column from position
  const rowFrom: number = positionFrom[0];
  const colFrom: number = positionFrom[1];
  // Get row and column piece is moving to
  const rowTo: number = positionTo[0];
  const colTo: number = positionTo[1];
  // If the bot tries to move off the board, stop it
  if (rowTo > 7 || colTo > 7) return layout;
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
  // CASTLING: If the piece is a rook and there are no pieces inbetween it and the king, it can castle, or swap into adjacent spots
  let castled: boolean = false;
  if (chessPiece === 'ROOK' && rowFrom === 0) {
    if (canCastleBot(boardLayout, positionFrom, side)) {
      // If the user clicks on the kings square, they will castle
      if (side === 'W' && rowTo === 0 && colTo === 4) {
        // Set castled to true
        castled = true;
        // Castling from left rook
        if (colFrom === 0) {
          layout[0][3] = piece;
          layout[0][2] = 'WK0';
        }
        // Castling from right rook
        else if (colFrom === 7) {
          layout[0][5] = piece;
          layout[0][6] = 'WK0';
        }
        // Reset old positions
        layout[rowFrom][colFrom] = null;
        layout[0][4] = null;
      }
      // Castling black side
      else if (side === 'B' && rowTo === 0 && colTo === 3) {
        // Set castled to true
        castled = true;
        // Castling from left rook
        if (colFrom === 0) {
          layout[0][2] = piece;
          layout[0][1] = 'BK0';
        }
        // Castling from right rook
        else if (colFrom === 7) {
          layout[0][4] = piece;
          layout[0][5] = 'BK0';
        }
        // Reset old positions
        layout[rowFrom][colFrom] = null;
        layout[0][3] = null;
      }
    }
  }
  // Take the piece in the rowTo, colTo and replace old position with null if we haven't castled
  if (!castled) {
    layout[rowTo][colTo] = piece;
    layout[rowFrom][colFrom] = null;
  }
  // If the piece is a pawn and makes it to the other end of the board, promote it to a queen (will change to users choice later)
  if (chessPiece === 'PAWN' && rowTo === 7) {
    // Count number of queens the bot has, set the promoted queen to side + Q + that number
    const numQueens = countQueens(botPieces);
    layout[rowTo][colTo] = side + 'Q' + numQueens; // Change to incrementing value, if we have multiple queens
  }
  // Return modified layout
  return layout;
};

// Function to check if empty spaces between rook and king -- FOR CASTLING but with slight modifications for the bot
export const canCastleBot = function (
  boardLayout: LayoutType,
  positionFrom: number[],
  side: string
) {
  // If the rook isnt in original position, return false, only need columns since checked rows to invoke this function
  if (positionFrom[1] !== 0 && positionFrom[1] !== 7) return false;
  // If the king isnt in original position, return false (position differs by side)
  if ((boardLayout[0][4] !== 'WK' && side === 'W') || (boardLayout[0][3] !== 'BK' && side === 'B')) return false;
  // If rook is in leftmost position
  if (positionFrom[1] === 0) {
    // Check that there are no pieces between rook and king
    if (side === 'W' && (boardLayout[0][1] || boardLayout[0][2] || boardLayout[0][3])) return false;
    else if (side === 'B' && (boardLayout[0][1] || boardLayout[0][2])) return false;
    else return true;
  }
  // If rook is in rightmost position
  if (positionFrom[1] === 7) {
    // Check that there are no pieces between rook and king
    if (side === 'W' && (boardLayout[0][6] || boardLayout[0][5])) return false;
    else if (side === 'B' && (boardLayout[0][6] || boardLayout[0][5] || boardLayout[0][4])) return false;
    else return true;
  }
};

// Function to see if a piece was captured during a move, if not, return null
export const captured = function(piece: string, positionTo: number[], boardLayout: LayoutType): string | null {
  const rowTo = positionTo[0];
  const colTo = positionTo[1];
  let pieceCaptured: string | null = null;
  // Determine enemy's side based on user's side
  const enemySide: string = piece[0] === 'W' ? 'B' : 'W';
  // Determine if current move will capture an enemy's piece
  if (boardLayout[rowTo][colTo] && boardLayout[rowTo][colTo][0] === enemySide) {
    pieceCaptured = boardLayout[rowTo][colTo];
  }
  return pieceCaptured;
}

// Function to adjust list of available pieces after a move, changing index to newly updated index
export const adjustPieces = function(currentPieces: AvailablePiecesType, piece: string, newPosition: number[], boardLayout: LayoutType): AvailablePiecesType {
  const newPieces: AvailablePiecesType = deepCopyPieces(currentPieces);
  // Iterate through pieces and find index of piece moved
  for (let i = 0; i < currentPieces.length; i += 1) {
    // Once the piece is found, update the index
    if (currentPieces[i].piece === piece) {
      newPieces[i].index = [...newPosition];
      // PROMOTION: If the piece is a pawn being promoted, change piece to the correct queen
      if (piece[1] === 'P' && newPosition[0] === 0 || newPosition[0] === 7) {
        newPieces[i].piece = piece[0] + 'Q' + countQueens(currentPieces);
      // CASTLING: If the piece is a rook castling with its king,change both their indices
      } else if (piece[1] === 'R' && boardLayout[newPosition[0]][newPosition[1]] === piece[0] + 'K0') {
        // Since castling comes from the same row, find which row that is
        const rowCastledFrom: number = newPosition[0];
        // Assign piece to the current rook
        newPieces[i].piece = piece;
        // White side
        if (piece[0] === 'W') {
          // Left rook
          if (piece[2] === '1') {
            newPieces[i].index = [rowCastledFrom, 3]; // Rook
            newPieces[0].index = [rowCastledFrom, 2]; // King
          // Right rook
          } else if (piece[2] === '2') {
            newPieces[i].index = [rowCastledFrom, 5]; // Rook
            newPieces[0].index = [rowCastledFrom, 6]; // King
          }
        // Black side
        } else if (piece[0] === 'B') {
          // Left rook
          if (piece[2] === '1') {
            newPieces[i].index = [rowCastledFrom, 2]; // Rook
            newPieces[0].index = [rowCastledFrom, 1]; // King
          // Right rook
          } else if (piece[2] === '2') {
            newPieces[i].index = [rowCastledFrom, 4]; // Rook
            newPieces[0].index = [rowCastledFrom, 5]; // King
          }
        }
      }
    }
  }
  return newPieces;
}

// Function to count queens for pawn promotion
const countQueens = function(availablePieces: AvailablePiecesType): number {
  let numQueens: number = 0;
  for (let i = 0; i < availablePieces.length; i += 1) {
    if (availablePieces[i].piece[1] === 'Q') {
      numQueens += 1;
    }
  }
  return numQueens;
}