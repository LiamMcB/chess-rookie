/* File which handles all stateful functionality on the board layout. */
import { defaultWhiteBoard, defaultBlackBoard, LayoutType, ColorLayoutType } from './defaultBoard';
import { ColorPalette } from '../public/colorPalette';

// Defines structure of state object
export interface StateType {
  boardLayout: LayoutType;
  colorLayout: ColorLayoutType;
}
// Structure of actions
export interface ActionType {
  type: ActionTypeOptions;
  payload: MovePayload;
}
// Types of actions allowed
export enum ActionTypeOptions {
  CHANGE_COLOR_PALETTE='CHANGE_COLOR_PALETTE',
  RESET_BOARD_WHITE='RESET_BOARD_WHITE',
  RESET_BOARD_BLACK='RESET_BOARD_BLACK',
  MOVE_PIECE='MOVE_PIECE',
  MOVE_PAWN='MOVE_PAWN'
}
// Interface to define payload of a piece move
export interface MovePayload {
  piece?: string;
  to?: number[]; // array with 2 ints to represent position piece is moving to
  from?: number[]; // array ie [2, 3] representing piece moving from row 2, column 3 on the board
  paletteIndex?: number; // number to represent which palette index were on
}

export const boardReducer = (state: StateType, action: ActionType) => {
  switch(action.type) {
    case 'CHANGE_COLOR_PALETTE':
      const index = action.payload.paletteIndex;
      console.log(index);
      const lightColor = ColorPalette[index].light;
      const darkColor = ColorPalette[index].dark;
      const newColorLayout: ColorLayoutType = [
        [lightColor, darkColor, lightColor, darkColor, lightColor, darkColor, lightColor, darkColor],
        [darkColor, lightColor, darkColor, lightColor, darkColor, lightColor, darkColor, lightColor],
        [lightColor, darkColor, lightColor, darkColor, lightColor, darkColor, lightColor, darkColor],
        [darkColor, lightColor, darkColor, lightColor, darkColor, lightColor, darkColor, lightColor],
        [lightColor, darkColor, lightColor, darkColor, lightColor, darkColor, lightColor, darkColor],
        [darkColor, lightColor, darkColor, lightColor, darkColor, lightColor, darkColor, lightColor],
        [lightColor, darkColor, lightColor, darkColor, lightColor, darkColor, lightColor, darkColor],
        [darkColor, lightColor, darkColor, lightColor, darkColor, lightColor, darkColor, lightColor],
      ];
      return {
        ...state,
        colorLayout: newColorLayout
      }
    case 'RESET_BOARD_WHITE':
      const defaultWhiteState: StateType = {
        ...state,
        boardLayout: [
          ['BR', 'BN', 'BB', 'BQ', 'BK', 'BB', 'BN', 'BR'],
          ['BP', 'BP', 'BP', 'BP', 'BP', 'BP', 'BP', 'BP'],
          Array(8).fill(null),
          Array(8).fill(null),
          Array(8).fill(null),
          Array(8).fill(null),
          ['WP', 'WP', 'WP', 'WP', 'WP', 'WP', 'WP', 'WP'],
          ['WR', 'WN', 'WB', 'WQ', 'WK', 'WB', 'WN', 'WR']
        ]
      }
      return defaultWhiteState;
    case 'RESET_BOARD_BLACK':
      const defaultBlackState: StateType = {
        ...state,
        boardLayout: [
          ['WR', 'WN', 'WB', 'WK', 'WQ', 'WB', 'WN', 'WR'],
          ['WP', 'WP', 'WP', 'WP', 'WP', 'WP', 'WP', 'WP'],
          Array(8).fill(null),
          Array(8).fill(null),
          Array(8).fill(null),
          Array(8).fill(null),
          ['BP', 'BP', 'BP', 'BP', 'BP', 'BP', 'BP', 'BP'],
          ['BR', 'BN', 'BB', 'BK', 'BQ', 'BB', 'BN', 'BR']
        ]
      }
      return defaultBlackState;
    case 'MOVE_PIECE':
      // Log the current move to the console
      console.log(`Moving ${action.payload.piece} from ${action.payload.from} to ${action.payload.to}`)
      // Get position of to and from payload
      const rowFrom = action.payload.from[0];
      const colFrom = action.payload.from[1];
      const rowTo = action.payload.to[0];
      const colTo = action.payload.to[1];
      // Place piece in new position for new layout
      const newLayout = state.boardLayout.slice();
      [newLayout[rowFrom][colFrom], newLayout[rowTo][colTo]] = [newLayout[rowTo][colTo], newLayout[rowFrom][colFrom]];
      // Return new state object with new layout as value
      return {
        ...state,
        boardLayout: newLayout
      };
    default:
      return {
        ...state,
        boardLayout: [
          ['BR', 'BN', 'BB', 'BQ', 'BK', 'BB', 'BN', 'BR'],
          ['BP', 'BP', 'BP', 'BP', 'BP', 'BP', 'BP', 'BP'],
          Array(8).fill(null),
          Array(8).fill(null),
          Array(8).fill(null),
          Array(8).fill(null),
          ['WP', 'WP', 'WP', 'WP', 'WP', 'WP', 'WP', 'WP'],
          ['WR', 'WN', 'WB', 'WQ', 'WK', 'WB', 'WN', 'WR']
        ]
      }
  }
}