/* Functions to power the logic behind the chess bot */
import { LayoutType, SideType } from './types';
import { movePiece, movePieceBot } from './moveHelpers';

export const botMoves = function(boardLayout: LayoutType, currentSide: SideType): LayoutType {
  let newLayout: LayoutType = [...boardLayout];
  // Mapping of side for console logging
  const sideMapping = {
    'B': 'Black',
    'W': 'White'
  }
  console.log(`${sideMapping[currentSide]} is moving!`);
  // Target [1, 4] pawn to move
  let colFrom: number = 4;
  let rowFrom: number;
  for (let i = 1; i <= 7; i += 1) {
    if (boardLayout[i][colFrom] === currentSide + 'P') {
      rowFrom = i;
      break;
    }
  }
  // Move pawn to test this out
  newLayout = movePiece(currentSide + 'P', [rowFrom, colFrom], [rowFrom + 1, colFrom], newLayout);

  return newLayout
}