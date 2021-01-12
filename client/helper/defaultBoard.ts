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
export const getDefaultWhitePiecesUser = function(): AvailablePiecesType {
  return [
    {piece: 'WK', index: [7, 4]}, 
    {piece: 'WQ', index: [7, 3]},
    {piece: 'WR', index: [7, 0]},
    {piece: 'WR', index: [7, 7]}, 
    {piece: 'WB', index: [7, 2]},
    {piece: 'WB', index: [7, 5]}, 
    {piece: 'WN', index: [7, 1]},
    {piece: 'WN', index: [7, 6]},
    {piece: 'WP', index: [6, 0]},
    {piece: 'WP', index: [6, 1]},
    {piece: 'WP', index: [6, 2]}, 
    {piece: 'WP', index: [6, 3]}, 
    {piece: 'WP', index: [6, 4]}, 
    {piece: 'WP', index: [6, 5]}, 
    {piece: 'WP', index: [6, 6]}, 
    {piece: 'WP', index: [6, 7]}
  ];
} 
export const getDefaultBlackPiecesUser = function(): AvailablePiecesType {
  return [
    {piece: 'BK', index: [7, 3]}, 
    {piece: 'WQ', index: [7, 4]},
    {piece: 'BR', index: [7, 0]},
    {piece: 'BR', index: [7, 7]}, 
    {piece: 'BB', index: [7, 2]},
    {piece: 'BB', index: [7, 5]}, 
    {piece: 'BN', index: [7, 1]},
    {piece: 'BN', index: [7, 6]},
    {piece: 'BP', index: [6, 0]},
    {piece: 'BP', index: [6, 1]},
    {piece: 'BP', index: [6, 2]}, 
    {piece: 'BP', index: [6, 3]}, 
    {piece: 'BP', index: [6, 4]}, 
    {piece: 'BP', index: [6, 5]}, 
    {piece: 'BP', index: [6, 6]}, 
    {piece: 'BP', index: [6, 7]}
  ];
}
export const getDefaultWhitePiecesBot = function(): AvailablePiecesType {
  return [
    {piece: 'WK', index: [0, 3]}, 
    {piece: 'WQ', index: [0, 4]},
    {piece: 'WR', index: [0, 0]},
    {piece: 'WR', index: [0, 7]}, 
    {piece: 'WB', index: [0, 2]},
    {piece: 'WB', index: [0, 5]}, 
    {piece: 'WN', index: [0, 1]},
    {piece: 'WN', index: [0, 6]},
    {piece: 'WP', index: [1, 0]},
    {piece: 'WP', index: [1, 1]},
    {piece: 'WP', index: [1, 2]}, 
    {piece: 'WP', index: [1, 3]}, 
    {piece: 'WP', index: [1, 4]}, 
    {piece: 'WP', index: [1, 5]}, 
    {piece: 'WP', index: [1, 6]}, 
    {piece: 'WP', index: [1, 7]}
  ];
} 
export const getDefaultBlackPiecesBot = function(): AvailablePiecesType {
  return [
    {piece: 'BK', index: [0, 4]}, 
    {piece: 'WQ', index: [0, 3]},
    {piece: 'BR', index: [0, 0]},
    {piece: 'BR', index: [0, 7]}, 
    {piece: 'BB', index: [0, 2]},
    {piece: 'BB', index: [0, 5]}, 
    {piece: 'BN', index: [0, 1]},
    {piece: 'BN', index: [0, 6]},
    {piece: 'BP', index: [1, 0]},
    {piece: 'BP', index: [1, 1]},
    {piece: 'BP', index: [1, 2]}, 
    {piece: 'BP', index: [1, 3]}, 
    {piece: 'BP', index: [1, 4]}, 
    {piece: 'BP', index: [1, 5]}, 
    {piece: 'BP', index: [1, 6]}, 
    {piece: 'BP', index: [1, 7]}
  ];
}