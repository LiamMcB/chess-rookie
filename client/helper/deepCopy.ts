/* Function to deep copy arrays, namely the board layout: Since it is an array of arrays, a shallow copy wont work. */
import { AvailablePiecesType, LayoutType } from './types';

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

export const deepCopyPieces = function(pieces: AvailablePiecesType): AvailablePiecesType {
  const deepCopy = [];
  for (let i = 0; i < pieces.length; i += 1) {
    deepCopy.push({piece: '', index: []});
    deepCopy[i].piece = pieces[i].piece;
    deepCopy[i].index = [...pieces[i].index];
  }
  return deepCopy;
}