/* File with helper functions that return array of indices for reducer to highlight */
import { LayoutType, ColorLayoutType, SideType } from './types';
import { ColorPalette } from '../constants/colorPalette';
import { canCastle } from './moveHelpers';

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
  if (chessPiece === 'KING') {
    // Top
    if (canMove([row - 1, col], boardLayout, side)) {
      highlightIndices.push([row - 1, col]);
    }
    // TR
    if (canMove([row - 1, col + 1], boardLayout, side)) {
      highlightIndices.push([row - 1, col + 1]);
    }
    // Right
    if (canMove([row, col + 1], boardLayout, side)) {
      highlightIndices.push([row, col + 1]);
    }
    // BR
    if (canMove([row + 1, col + 1], boardLayout, side)) {
      highlightIndices.push([row + 1, col + 1]);
    }
    // Bottom
    if (canMove([row + 1, col], boardLayout, side)) {
      highlightIndices.push([row + 1, col]);
    }
    // BL
    if (canMove([row + 1, col - 1], boardLayout, side)) {
      highlightIndices.push([row + 1, col - 1]);
    }
    // Left
    if (canMove([row, col - 1], boardLayout, side)) {
      highlightIndices.push([row, col - 1]);
    }
    // TL
    if (canMove([row - 1, col - 1], boardLayout, side)) {
      highlightIndices.push([row - 1, col - 1]);
    }
  }
  // Queens move as many squares in any directions as the user wants
  else if (chessPiece === 'QUEEN') {
    // Highlight top, right, bottom, left
    highlightTop(position, boardLayout, side, highlightIndices);
    highlightRight(position, boardLayout, side, highlightIndices);
    highlightBottom(position, boardLayout, side, highlightIndices);
    highlightLeft(position, boardLayout, side, highlightIndices);
    // Highlight Diagonally
    highlightDiagonal(position, boardLayout, side, highlightIndices); 
  }
  // Rooks move as many squares vertically or horizontally as the user wants
  else if (chessPiece === 'ROOK') {
    // Top
    highlightTop(position, boardLayout, side, highlightIndices);
    // Right
    highlightRight(position, boardLayout, side, highlightIndices);
    // Bottom
    highlightBottom(position, boardLayout, side, highlightIndices);
    // Left
    highlightLeft(position, boardLayout, side, highlightIndices);
    // CASTLING: Where king and rook swap places, more info in movehelpers
    if (canCastle(boardLayout, position, side)) {
      // Depending on side, highlight king's position
      if (side === 'W') highlightIndices.push([7, 4]);
      else if (side === 'B') highlightIndices.push([7, 3]);
    }
  }
  // Bishops move as many squares diagonally as the user wants
  else if (chessPiece === 'BISHOP') {
    // Highlight diagonally
    highlightDiagonal(position, boardLayout, side, highlightIndices);
  }
  // Knights move in an L-shape, 2 squares one direction and 1 square in the perpendicular direction
  else if (chessPiece === 'KNIGHT') {
    // TR Up 2 Right 1
    if (canMove([row - 2, col + 1], boardLayout, side)) {
      highlightIndices.push([row - 2, col + 1]);
    }
    // TRR Up 1 Right 2
    if (canMove([row - 1, col + 2], boardLayout, side)) {
      highlightIndices.push([row - 1, col + 2]);
    }
    // BRR Down 1 Right 2
    if (canMove([row + 1, col + 2], boardLayout, side)) {
      highlightIndices.push([row + 1, col + 2]);
    }
    // BR Down 2 Right 1
    if (canMove([row + 2, col + 1], boardLayout, side)) {
      highlightIndices.push([row + 2, col + 1]);
    }
    // BL Down 2 Left 1
    if (canMove([row + 2, col - 1], boardLayout, side)) {
      highlightIndices.push([row + 2, col - 1]);
    }
    // BLL Down 1 Left 2
    if (canMove([row + 1, col - 2], boardLayout, side)) {
      highlightIndices.push([row + 1, col - 2]);
    }
    // TLL Up 1 Left 2
    if (canMove([row - 1, col - 2], boardLayout, side)) {
      highlightIndices.push([row - 1, col - 2]);
    }
    // TL Up 2 Left 1
    if (canMove([row - 2, col - 1], boardLayout, side)) {
      highlightIndices.push([row - 2, col - 1]);
    }
  }
  // Pawns move one square forward except for on their first move, where they can move two squares and capture diagonally forward
  else if (chessPiece === 'PAWN') {
    // Top - cant move this way if there is an enemy piece there
    if (canMove([row - 1, col], boardLayout, side) && !boardLayout[row - 1][col]) {
      highlightIndices.push([row - 1, col]);
    }
    // TR Capture
    if (canMove([row - 1, col + 1], boardLayout, side) && pawnMoveDiagonal(boardLayout, [row - 1, col + 1], side)) {
      highlightIndices.push([row - 1, col + 1]);
    }
    // TL Capture
    if (canMove([row - 1, col - 1], boardLayout, side) && pawnMoveDiagonal(boardLayout, [row - 1, col - 1], side)) {
      highlightIndices.push([row - 1, col - 1]);
    }
    // If pawn's first move, highlight one additional square
    if (canMove([row - 2, col], boardLayout, side) && row === 6 && !boardLayout[row - 2][col] && !boardLayout[row - 1][col]) {
      highlightIndices.push([row - 2, col]);
    }
  }
  return highlightIndices;
};

// HELPERS THAT HIGHLIGHT A NUMBER OF SQUARES IN EACH DIRECTION
// Helper that highlights squares forward from current piece
export const highlightTop = function (
  position: number[],
  boardLayout: LayoutType,
  side: string,
  highlightIndices: number[][]
): void {
  // Get row and column from position
  const row: number = position[0];
  const col: number = position[1];
  // Start top at the square right above our current square
  let top = row - 1;
  while (top >= 0) {
    if (canMove([top, col], boardLayout, side)) {
      // If there is a piece of opposite side, highlight that square and no further squares
      if (boardLayout[top][col] && boardLayout[top][col][0] !== side) {
        highlightIndices.push([top, col]);
        break;
      }
      // Highlight and decrement top
      else {
        highlightIndices.push([top, col]);
        top -= 1;
      }
    } else break;
  }
};
// Helper that highlights squares before/below the current piece
export const highlightBottom = function (
  position: number[],
  boardLayout: LayoutType,
  side: string,
  highlightIndices: number[][]
): void {
  // Get row and column from position
  const row: number = position[0];
  const col: number = position[1];
  // Start bottom at the square right below our current square
  let bottom = row + 1;
  while (bottom <= 8) {
    if (canMove([bottom, col], boardLayout, side)) {
      // If there is a piece of opposite side, highlight that square and no further squares
      if (boardLayout[bottom][col] && boardLayout[bottom][col][0] !== side) {
        highlightIndices.push([bottom, col]);
        break;
      }
      // Highlight and increment bottom
      else {
        highlightIndices.push([bottom, col]);
        bottom += 1;
      }
    } else break;
  }
};
// Helper that highlights squares to the right of the current piece
export const highlightRight = function (
  position: number[],
  boardLayout: LayoutType,
  side: string,
  highlightIndices: number[][]
): void {
  // Get row and column from position
  const row: number = position[0];
  const col: number = position[1];
  // Start bottom at the square right of our current square
  let right = col + 1;
  while (right <= 8) {
    if (canMove([row, right], boardLayout, side)) {
      // If there is a piece of opposite side, highlight that square and no further squares
      if (boardLayout[row][right] && boardLayout[row][right][0] !== side) {
        highlightIndices.push([row, right]);
        break;
      }
      // Highlight and increment right
      else {
        highlightIndices.push([row, right]);
        right += 1;
      }
    } else break;
  }
};
// Helper that highlights squares to the left of the current piece
export const highlightLeft = function (
  position: number[],
  boardLayout: LayoutType,
  side: string,
  highlightIndices: number[][]
): void {
  // Get row and column from position
  const row: number = position[0];
  const col: number = position[1];
  // Start left at the square right to the left of our current square
  let left = col - 1;
  while (left >= 0) {
    if (canMove([row, left], boardLayout, side)) {
      // If there is a piece of opposite side, highlight that square and no further squares
      if (boardLayout[row][left] && boardLayout[row][left][0] !== side) {
        highlightIndices.push([row, left]);
        break;
      }
      // Highlight and increment right
      else {
        highlightIndices.push([row, left]);
        left -= 1;
      }
    } else break;
  }
};
// Helper that highlights squares diagonal of the current piece
export const highlightDiagonal = function (
  position: number[],
  boardLayout: LayoutType,
  side: string,
  highlightIndices: number[][]
): void {
  // Get row and column from position
  const row: number = position[0];
  const col: number = position[1];
  // Highlight top right diagonal
  let topRight = [row - 1, col + 1];
  while (topRight[0] >= 0 && topRight[1] <= 8) {
    if (canMove(topRight, boardLayout, side)) {
      // If there is a piece of opposite side, highlight that square and no further squares
      if (boardLayout[topRight[0]][topRight[1]] && boardLayout[topRight[0]][topRight[1]][0] !== side) {
        highlightIndices.push(topRight);
        break;
      }
      // Highlight and increment top right
      else {
        highlightIndices.push(topRight);
        topRight = [topRight[0] - 1, topRight[1] + 1];
      }
    } else break;
  };
  // Highlight bottom right diagonal
  let bottomRight = [row + 1, col + 1];
  while (bottomRight[0] <= 8 && bottomRight[1] <= 8) {
    if (canMove(bottomRight, boardLayout, side)) {
      // If there is a piece of opposite side, highlight that square and no further squares
      if (boardLayout[bottomRight[0]][bottomRight[1]] && boardLayout[bottomRight[0]][bottomRight[1]][0] !== side) {
        highlightIndices.push(bottomRight);
        break;
      }
      // Highlight and increment bottom right
      else {
        highlightIndices.push(bottomRight);
        bottomRight = [bottomRight[0] + 1, bottomRight[1] + 1];
      }
    } else break;
  };
  // Highlight bottom left diagonal
  let bottomLeft = [row + 1, col - 1];
  while (bottomLeft[0] <= 8 && bottomLeft[1] >= 0) {
    if (canMove(bottomLeft, boardLayout, side)) {
      // If there is a piece of opposite side, highlight that square and no further squares
      if (boardLayout[bottomLeft[0]][bottomLeft[1]] && boardLayout[bottomLeft[0]][bottomLeft[1]][0] !== side) {
        highlightIndices.push(bottomLeft);
        break;
      }
      // Highlight and increment bottom left
      else {
        highlightIndices.push(bottomLeft);
        bottomLeft = [bottomLeft[0] + 1, bottomLeft[1] - 1];
      }
    } else break;
  };
  // Highlight top left diagonal
  let topLeft = [row - 1, col - 1];
  while (topLeft[0] >= 0 && topLeft[1] >= 0) {
    if (canMove(topLeft, boardLayout, side)) {
      // If there is a piece of opposite side, highlight that square and no further squares
      if (boardLayout[topLeft[0]][topLeft[1]] && boardLayout[topLeft[0]][topLeft[1]][0] !== side) {
        highlightIndices.push(topLeft);
        break;
      }
      // Highlight and increment top left
      else {
        highlightIndices.push(topLeft);
        topLeft = [topLeft[0] - 1, topLeft[1] - 1];
      }
    } else break;
  };
}

// Helper function that checks if the piece can move to an index
export const canMove = function (
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

// Helper function that determines if a pawn can move diagonally to capture
export const pawnMoveDiagonal = function(boardLayout: LayoutType, positionTo: number[], side: string) {
  let canMove = false;
  // Row and coulmn moving to
  const rowTo = positionTo[0];
  const colTo = positionTo[1];
  // See if positon diagonal is not null
  if (boardLayout[rowTo][colTo]) {
    if (boardLayout[rowTo][colTo][0] !== side) {
      canMove = true;
    }
  }
  return canMove;
}

// Helper that unhighlights whole board and returns it
export const unhighlightBoard = function (
  paletteIndex: number
): ColorLayoutType {
  const lightColor = ColorPalette[paletteIndex].light;
  const darkColor = ColorPalette[paletteIndex].dark;
  return [
    [
      lightColor,
      darkColor,
      lightColor,
      darkColor,
      lightColor,
      darkColor,
      lightColor,
      darkColor,
    ],
    [
      darkColor,
      lightColor,
      darkColor,
      lightColor,
      darkColor,
      lightColor,
      darkColor,
      lightColor,
    ],
    [
      lightColor,
      darkColor,
      lightColor,
      darkColor,
      lightColor,
      darkColor,
      lightColor,
      darkColor,
    ],
    [
      darkColor,
      lightColor,
      darkColor,
      lightColor,
      darkColor,
      lightColor,
      darkColor,
      lightColor,
    ],
    [
      lightColor,
      darkColor,
      lightColor,
      darkColor,
      lightColor,
      darkColor,
      lightColor,
      darkColor,
    ],
    [
      darkColor,
      lightColor,
      darkColor,
      lightColor,
      darkColor,
      lightColor,
      darkColor,
      lightColor,
    ],
    [
      lightColor,
      darkColor,
      lightColor,
      darkColor,
      lightColor,
      darkColor,
      lightColor,
      darkColor,
    ],
    [
      darkColor,
      lightColor,
      darkColor,
      lightColor,
      darkColor,
      lightColor,
      darkColor,
      lightColor,
    ],
  ];
};
