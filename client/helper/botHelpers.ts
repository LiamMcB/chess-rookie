/* Functions to power the logic behind the chess bot */
import { LayoutType, SideType } from './types';

export const botMoves = function(boardLayout: LayoutType, currentSide: SideType): LayoutType {
  const newLayout = [...boardLayout];
  // Mapping of side for console logging
  const sideMapping = {
    'B': 'Black',
    'W': 'White'
  }
  console.log(`${sideMapping[currentSide]} is moving!`);
  return newLayout
}