/* Layout of default chess board with MAPPING of symbols to their svg url
KEY:
- WK = 'White King'
- BN = 'Black Knight'
- null => empty square (no pieces there)
etc...
From a bird's eye perspective as either white or black player
*/
import { BlackPieces, WhitePieces } from './public/chessPieces';

export const defaultBlackBoard: string[][] = [
  ['WR', 'WN', 'WB', 'WK', 'WQ', 'WB', 'WN', 'WR'],
  ['WP', 'WP', 'WP', 'WP', 'WP', 'WP', 'WP', 'WP'],
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill(null),
  ['BP', 'BP', 'BP', 'BP', 'BP', 'BP', 'BP', 'BP'],
  ['BR', 'BN', 'BB', 'BK', 'BQ', 'BB', 'BN', 'BR']
];

export const defaultWhiteBoard: string[][] = [
  ['BR', 'BN', 'BB', 'BQ', 'BK', 'BB', 'BN', 'BR'],
  ['BP', 'BP', 'BP', 'BP', 'BP', 'BP', 'BP', 'BP'],
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill(null),
  ['WP', 'WP', 'WP', 'WP', 'WP', 'WP', 'WP', 'WP'],
  ['WR', 'WN', 'WB', 'WQ', 'WK', 'WB', 'WN', 'WR']
];

// Mapping of pieces
export const PieceMapping = {
  // White Pieces
  'WK': WhitePieces.WhiteKing,
  'WQ': WhitePieces.WhiteQueen,
  'WR': WhitePieces.WhiteRook,
  'WB': WhitePieces.WhiteBishop,
  'WN': WhitePieces.WhiteKnight,
  'WP': WhitePieces.WhitePawn,
  // Black Pieces
  'BK': BlackPieces.BlackKing,
  'BQ': BlackPieces.BlackQueen,
  'BR': BlackPieces.BlackRook,
  'BB': BlackPieces.BlackBishop,
  'BN': BlackPieces.BlackKnight,
  'BP': BlackPieces.BlackPawn
};