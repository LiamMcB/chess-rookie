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

// Function to return defaultBlackBoard
export function getDefaultBlackBoard(): LayoutType {
  return [
    ['WR1', 'WN1', 'WB1', 'WK', 'WQ', 'WB2', 'WN2', 'WR2'],
    ['WP1', 'WP2', 'WP3', 'WP4', 'WP5', 'WP6', 'WP7', 'WP8'],
    Array(8).fill(null),
    Array(8).fill(null),
    Array(8).fill(null),
    Array(8).fill(null),
    ['BP1', 'BP2', 'BP3', 'BP4', 'BP5', 'BP6', 'BP7', 'BP8'],
    ['BR1', 'BN1', 'BB1', 'BK', 'BQ', 'BB2', 'BN2', 'BR2']
  ];
}

// Function to return defaultWhiteBoard
export function getDefaultWhiteBoard(): LayoutType {
  return [
    ['BR1', 'BN1', 'BB1', 'BQ', 'BK', 'BB2', 'BN2', 'BR2'],
    ['BP1', 'BP2', 'BP3', 'BP4', 'BP5', 'BP6', 'BP7', 'BP8'],
    Array(8).fill(null),
    Array(8).fill(null),
    Array(8).fill(null),
    Array(8).fill(null),
    ['WP1', 'WP2', 'WP3', 'WP4', 'WP5', 'WP6', 'WP7', 'WP8'],
    ['WR1', 'WN1', 'WB1', 'WQ', 'WK', 'WB2', 'WN2', 'WR2']
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
export const getDefaultWhitePiecesUser = function(): AvailablePiecesType {
  return [
    {piece: 'WK', index: [7, 4]}, 
    {piece: 'WQ', index: [7, 3]},
    {piece: 'WR1', index: [7, 0]},
    {piece: 'WR2', index: [7, 7]}, 
    {piece: 'WB1', index: [7, 2]},
    {piece: 'WB2', index: [7, 5]}, 
    {piece: 'WN1', index: [7, 1]},
    {piece: 'WN2', index: [7, 6]},
    {piece: 'WP1', index: [6, 0]},
    {piece: 'WP2', index: [6, 1]},
    {piece: 'WP3', index: [6, 2]}, 
    {piece: 'WP4', index: [6, 3]}, 
    {piece: 'WP5', index: [6, 4]}, 
    {piece: 'WP6', index: [6, 5]}, 
    {piece: 'WP7', index: [6, 6]}, 
    {piece: 'WP8', index: [6, 7]}
  ];
} 
export const getDefaultBlackPiecesUser = function(): AvailablePiecesType {
  return [
    {piece: 'BK', index: [7, 3]}, 
    {piece: 'WQ', index: [7, 4]},
    {piece: 'BR1', index: [7, 0]},
    {piece: 'BR2', index: [7, 7]}, 
    {piece: 'BB1', index: [7, 2]},
    {piece: 'BB2', index: [7, 5]}, 
    {piece: 'BN1', index: [7, 1]},
    {piece: 'BN2', index: [7, 6]},
    {piece: 'BP1', index: [6, 0]},
    {piece: 'BP2', index: [6, 1]},
    {piece: 'BP3', index: [6, 2]}, 
    {piece: 'BP4', index: [6, 3]}, 
    {piece: 'BP5', index: [6, 4]}, 
    {piece: 'BP6', index: [6, 5]}, 
    {piece: 'BP7', index: [6, 6]}, 
    {piece: 'BP8', index: [6, 7]}
  ];
}
export const getDefaultWhitePiecesBot = function(): AvailablePiecesType {
  return [
    {piece: 'WK', index: [0, 3]}, 
    {piece: 'WQ', index: [0, 4]},
    {piece: 'WR1', index: [0, 0]},
    {piece: 'WR2', index: [0, 7]}, 
    {piece: 'WB1', index: [0, 2]},
    {piece: 'WB2', index: [0, 5]}, 
    {piece: 'WN1', index: [0, 1]},
    {piece: 'WN2', index: [0, 6]},
    {piece: 'WP1', index: [1, 0]},
    {piece: 'WP2', index: [1, 1]},
    {piece: 'WP3', index: [1, 2]}, 
    {piece: 'WP4', index: [1, 3]}, 
    {piece: 'WP5', index: [1, 4]}, 
    {piece: 'WP6', index: [1, 5]}, 
    {piece: 'WP7', index: [1, 6]}, 
    {piece: 'WP8', index: [1, 7]}
  ];
} 
export const getDefaultBlackPiecesBot = function(): AvailablePiecesType {
  return [
    {piece: 'BK', index: [0, 4]}, 
    {piece: 'WQ', index: [0, 3]},
    {piece: 'BR1', index: [0, 0]},
    {piece: 'BR2', index: [0, 7]}, 
    {piece: 'BB1', index: [0, 2]},
    {piece: 'BB2', index: [0, 5]}, 
    {piece: 'BN1', index: [0, 1]},
    {piece: 'BN2', index: [0, 6]},
    {piece: 'BP1', index: [1, 0]},
    {piece: 'BP2', index: [1, 1]},
    {piece: 'BP3', index: [1, 2]}, 
    {piece: 'BP4', index: [1, 3]}, 
    {piece: 'BP5', index: [1, 4]}, 
    {piece: 'BP6', index: [1, 5]}, 
    {piece: 'BP7', index: [1, 6]}, 
    {piece: 'BP8', index: [1, 7]}
  ];
}