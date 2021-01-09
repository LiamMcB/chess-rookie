/* Function to deep copy arrays, namely the board layout: Since it is an array of arrays, a shallow copy wont work. */
import { LayoutType } from './types';

export const deepCopyArray = function(boardLayout: LayoutType): LayoutType {
  const deepCopy = [];
  for (let i = 0; i < boardLayout.length; i += 1) {
    if (!deepCopy[i]) deepCopy[i] = [];
    for (let j = 0; j < boardLayout[i].length; j += 1) {
      deepCopy[i].push(boardLayout[i][j]);
    }
  }
  return deepCopy;
}
