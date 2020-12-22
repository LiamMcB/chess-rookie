/* File which handles all stateful functionality on the board layout. */
import { defaultWhiteBoard, defaultBlackBoard } from './defaultBoard';

// Structure of actions
export interface ActionType {
  type: ActionTypeOptions;
  payload: MovePayload;
}
// Types of actions allowed
export enum ActionTypeOptions {
  RESET_BOARD_WHITE='RESET_BOARD_WHITE',
  RESET_BOARD_BLACK='RESET_BOARD_BLACK',
  MOVE_PIECE='MOVE_PIECE',
  MOVE_PAWN='MOVE_PAWN'
}
// Interface to define payload of a piece move
export interface MovePayload {
  piece: string;
  to: number[]; // array with 2 ints to represent position piece is moving to
  from: number[]; // array ie [2, 3] representing piece moving from row 2, column 3 on the board
}

export const boardReducer = (state: string[][], action: ActionType) => {
  switch(action.type) {
    case 'RESET_BOARD_WHITE':
      return defaultWhiteBoard;
    case 'RESET_BOARD_BLACK':
      return defaultBlackBoard;
    case 'MOVE_PIECE':
      // Get position of to and from payload
      const row = action.payload.from[0];
      const col = action.payload.from[1];
      // Place piece in new position for new layout
      const oldLayout = [...state];
      [oldLayout[row - 1][col], oldLayout[row][col]] = [oldLayout[row][col], oldLayout[row - 1][col]];
      return oldLayout;
  }
}