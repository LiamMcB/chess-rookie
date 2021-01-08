/* Functions to power the logic behind the chess bot */
import { LayoutType, SideType, AvailablePiecesType } from './types';
import { movePiece, movePieceBot } from './moveHelpers';
import { MovePayload } from './boardReducer';

// Overall function to encapsulate the bot
export const botMoves = function(boardLayout: LayoutType, currentSide: SideType, availablePieces: AvailablePiecesType): LayoutType {
  let newLayout: LayoutType = [...boardLayout];
  // Mapping of side for console logging
  const sideMapping = {
    'B': 'Black',
    'W': 'White'
  }
  console.log(`${sideMapping[currentSide]} is moving!`);
  // Function that will calculate which move to make 
  const { piece, to, from } = findBestMove(boardLayout, currentSide, availablePieces);
  // Move pawn to test this out
  newLayout = movePieceBot(piece, from, to, newLayout);

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