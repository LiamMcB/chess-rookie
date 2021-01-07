/* Layout of default chess board 
KEY:
- WK = 'White King'
- BN = 'Black Knight'
- null => empty square (no pieces there)
etc...
From a bird's eye perspective as either white or black player
*/
import { ColorPalette } from '../constants/colorPalette.js'
import { LayoutType, ColorLayoutType, AvailablePiecesType } from './types';

export const defaultBlackBoard: LayoutType = [
  ['WR', 'WN', 'WB', 'WK', 'WQ', 'WB', 'WN', 'WR'],
  ['WP', 'WP', 'WP', 'WP', 'WP', 'WP', 'WP', 'WP'],
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill(null),
  ['BP', 'BP', 'BP', 'BP', 'BP', 'BP', 'BP', 'BP'],
  ['BR', 'BN', 'BB', 'BK', 'BQ', 'BB', 'BN', 'BR']
];
// Function to return defaultBlackBoard
export function getDefaultBlackBoard(): LayoutType {
  return [
    ['WR', 'WN', 'WB', 'WK', 'WQ', 'WB', 'WN', 'WR'],
    ['WP', 'WP', 'WP', 'WP', 'WP', 'WP', 'WP', 'WP'],
    Array(8).fill(null),
    Array(8).fill(null),
    Array(8).fill(null),
    Array(8).fill(null),
    ['BP', 'BP', 'BP', 'BP', 'BP', 'BP', 'BP', 'BP'],
    ['BR', 'BN', 'BB', 'BK', 'BQ', 'BB', 'BN', 'BR']
  ];
}

export const defaultWhiteBoard: LayoutType = [
  ['BR', 'BN', 'BB', 'BQ', 'BK', 'BB', 'BN', 'BR'],
  ['BP', 'BP', 'BP', 'BP', 'BP', 'BP', 'BP', 'BP'],
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill(null),
  ['WP', 'WP', 'WP', 'WP', 'WP', 'WP', 'WP', 'WP'],
  ['WR', 'WN', 'WB', 'WQ', 'WK', 'WB', 'WN', 'WR']
];
// Function to return defaultWhiteBoard
export function getDefaultWhiteBoard(): LayoutType {
  return [
    ['BR', 'BN', 'BB', 'BQ', 'BK', 'BB', 'BN', 'BR'],
    ['BP', 'BP', 'BP', 'BP', 'BP', 'BP', 'BP', 'BP'],
    Array(8).fill(null),
    Array(8).fill(null),
    Array(8).fill(null),
    Array(8).fill(null),
    ['WP', 'WP', 'WP', 'WP', 'WP', 'WP', 'WP', 'WP'],
    ['WR', 'WN', 'WB', 'WQ', 'WK', 'WB', 'WN', 'WR']
  ];
}

const lightColor = ColorPalette[0].light;
const darkColor = ColorPalette[0].dark;
export const defaultColorLayout: ColorLayoutType = [
  [lightColor, darkColor, lightColor, darkColor, lightColor, darkColor, lightColor, darkColor],
  [darkColor, lightColor, darkColor, lightColor, darkColor, lightColor, darkColor, lightColor],
  [lightColor, darkColor, lightColor, darkColor, lightColor, darkColor, lightColor, darkColor],
  [darkColor, lightColor, darkColor, lightColor, darkColor, lightColor, darkColor, lightColor],
  [lightColor, darkColor, lightColor, darkColor, lightColor, darkColor, lightColor, darkColor],
  [darkColor, lightColor, darkColor, lightColor, darkColor, lightColor, darkColor, lightColor],
  [lightColor, darkColor, lightColor, darkColor, lightColor, darkColor, lightColor, darkColor],
  [darkColor, lightColor, darkColor, lightColor, darkColor, lightColor, darkColor, lightColor],
];

// Default piece choices for each side
export const getDefaultWhitePieces = function(): AvailablePiecesType {
  return [
    'WK', 'WQ', 'WR', 'WR', 'WB', 'WB', 'WN', 'WN', 
    'WP', 'WP', 'WP', 'WP', 'WP', 'WP', 'WP', 'WP'
  ];
} 
export const getDefaultBlackPieces = function(): AvailablePiecesType {
  return [
    'BK', 'BQ', 'BR', 'BR', 'BB', 'BB', 'BN', 'BN', 
    'BP', 'BP', 'BP', 'BP', 'BP', 'BP', 'BP', 'BP'
  ];
}