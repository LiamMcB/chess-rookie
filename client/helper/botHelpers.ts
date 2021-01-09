/* Functions to power the logic behind the chess bot */
import { LayoutType, SideType, AvailablePiecesType } from './types';
import { movePiece, movePieceBot } from './moveHelpers';
import { getPossibleMoves } from './possibleMoves';
import { MovePayload } from './boardReducer';
import { deepCopyArray } from './deepCopy';

// Overall function to encapsulate the bot
export const botMoves = function(boardLayout: LayoutType, currentSide: SideType, availablePieces: AvailablePiecesType): LayoutType {
  let newLayout: LayoutType = [...boardLayout];
  // Mapping of side for console logging
  const sideMapping = {
    'B': 'Black',
    'W': 'White'
  }
  // Function that will calculate which move to make 
  const { piece, to, from } = findBestMove(boardLayout, currentSide, availablePieces);
  // const { piece, to, from } = { piece: 'BP', to: [2, 4], from: [1, 4]}
  console.log(`${sideMapping[currentSide]} is moving from ${from} to ${to}!`);
  // Move pawn to test this out
  newLayout = movePieceBot(piece, from, to, boardLayout);
  return newLayout
}

// Function that calculates the best possible move for the bot
const findBestMove = function(boardLayout: LayoutType, currentSide: SideType, availablePieces: AvailablePiecesType): MovePayload {
  const piece: string = currentSide + 'P';
  const oppositeSide: SideType = currentSide === SideType.White ? SideType.Black : SideType.White;
  // Target [1, 4] pawn to move
  let colFrom: number = 4;
  let rowFrom: number;
  for (let i = 1; i <= 7; i += 1) {
    if (boardLayout[i][colFrom] === currentSide + 'P') {
      rowFrom = i;
      break;
    }
  }
  const to = [rowFrom + 1, colFrom];
  // Piece evaluation used to find best move
  const pieceEvaluation = new Map();
  // Current Side is has negative value (lose more value for more important pieces)
  pieceEvaluation.set(currentSide + 'K', -900);
  pieceEvaluation.set(currentSide + 'Q', -90);
  pieceEvaluation.set(currentSide + 'R', -50);
  pieceEvaluation.set(currentSide + 'B', -30);
  pieceEvaluation.set(currentSide + 'N', -30);
  pieceEvaluation.set(currentSide + 'P', -10);
  // Opposite side is positive (want to gain value)
  pieceEvaluation.set(oppositeSide + 'K', -900);
  pieceEvaluation.set(oppositeSide + 'Q', -90);
  pieceEvaluation.set(oppositeSide + 'R', -50);
  pieceEvaluation.set(oppositeSide + 'B', -30);
  pieceEvaluation.set(oppositeSide + 'N', -30);
  pieceEvaluation.set(oppositeSide + 'P', -10);
  // Variable to keep track of move with highest positive value
  let bestMove = {
    piece: '',
    to: [],
    from: [],
    value: -Infinity
  } 
  // Iterate over all available pieces
  const boardCopy: LayoutType = deepCopyArray(boardLayout); // Need copy since ill null out pieces once i get their moves
  for (let i = 0; i < availablePieces.length; i += 1) {
    const currentPiece: string = availablePieces[i];
    // Find position of current piece
    const currentPosition: number[] = findIndex(currentPiece, boardCopy);
    // Find all possible moves, returns an array of [row, col]
    const possibleMoves = getPossibleMoves(currentPiece, currentPosition, boardLayout);
    console.log(`Possible Moves for ${currentPiece}:\n`, possibleMoves);
    // Iterate over possible moves (if there are any) and reset bestMove for larger values

  }
  // Return move payload back to botMoves function
  return {
    piece,
    to,
    from: [rowFrom, colFrom] 
  }
}

// Function to remove a captured piece from bot's pieces
export const removeBotPieces = function(capturedPiece: string, botPieces: AvailablePiecesType): AvailablePiecesType {
  const botPiecesCopy: AvailablePiecesType = [...botPieces];
  let capturedIndex: number;
  // Find index of captured piece
  botPieces.forEach((piece, index) => {
    if (piece === capturedPiece) capturedIndex = index;
  });
  // Splice captured index out of botPieces and return it
  botPiecesCopy.splice(capturedIndex, 1);
  return botPiecesCopy;
}

// Function to find position of current piece
const findIndex = function(currentPiece: string, boardCopy: LayoutType): number[] {
  const index: number[] = [];
  for (let i = 0; i < boardCopy.length; i += 1) {
    for (let j = 0; j < boardCopy[i].length; j += 1) {
      if (boardCopy[i][j] === currentPiece) {
        index.push(i);
        index.push(j);
        // Set the piece at this index to null, since its just a copy of the layout
        boardCopy[i][j] = null;
        return index; 
      }
    }
  }
  return index;
}