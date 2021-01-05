/* Functions to power the logic behind the chess bot */
import { LayoutType } from './types';

export const botMoves = function(boardLayout: LayoutType) {
  // Move after 1 second, then run functionality
  setTimeout(() => console.log('Im moving!'), 1000);
}