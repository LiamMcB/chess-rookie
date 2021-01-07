/* Functions to power the logic behind the chess bot */
import { LayoutType, SideType } from './types';
import { movePiece, movePieceBot } from './moveHelpers';
import { MovePayload } from './boardReducer';

// Overall function to encapsulate the bot
export const botMoves = function(boardLayout: LayoutType, currentSide: SideType): LayoutType {
  let newLayout: LayoutType = [...boardLayout];
  // Mapping of side for console logging
  const sideMapping = {
    'B': 'Black',
    'W': 'White'
  }
  console.log(`${sideMapping[currentSide]} is moving!`);
  // Function that will calculate which move to make 
  const { piece, to, from } = findBestMove(boardLayout, currentSide);
  // Move pawn to test this out
  newLayout = movePieceBot(piece, from, to, newLayout);

  return newLayout
}

// Function that calculates the best possible move for the bot
const findBestMove = function(boardLayout: LayoutType, currentSide: SideType): MovePayload {
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
  return {
    piece,
    to,
    from: [rowFrom, colFrom] 
  }
}