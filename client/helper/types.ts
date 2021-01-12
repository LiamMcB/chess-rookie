export type LayoutType = readonly (string|null)[][];
export type ColorLayoutType = string[][];
export enum SideType {
  White = 'W',
  Black = 'B'
}
export type AvailablePiecesType = PiecePositionType[]; // Having each piece include its index saves time complexity for bot moves algorithm
interface PiecePositionType {
  piece: string; // ie 'BP' for black pawn
  index: number[]; // [row, col]
}