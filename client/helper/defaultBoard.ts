/* Layout of default chess board 
KEY:
- WK = 'White King'
- BN = 'Black Knight'
- null => empty square (no pieces there)
etc...
From a bird's eye perspective as either white or black player
*/

export type LayoutType = readonly (string|null)[][];

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

