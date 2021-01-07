/* File which handles all stateful functionality on the board layout. */
import { getDefaultWhiteBoard, getDefaultBlackBoard, getDefaultBlackPieces, getDefaultWhitePieces } from './defaultBoard';
import { LayoutType, ColorLayoutType, SideType, AvailablePiecesType } from './types';
import { ColorPalette, HighlightedColor } from '../constants/colorPalette';
import { highlight, unhighlightBoard } from './highlightHelpers';
import { movePiece, captured } from './moveHelpers';
import { botMoves, removeBotPieces } from './botHelpers';

// Defines structure of state object
export interface StateType {
  boardLayout: LayoutType;
  colorLayout: ColorLayoutType;
  paletteIndex: number;
  movingPiece: MovePayload | null; // Represents information about which piece were moving and where from
  currentSide: SideType; // Represents the current side moving, which isn't necessarily the same as the user's side
  botPieces: AvailablePiecesType; // Represents the choices for the bot to move, array of strings ('WP' or 'BK')
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
  HIGHLIGHT_MOVES='HIGHLIGHT_MOVES',
  UN_HIGHLIGHT_MOVES='UN_HIGHLIGHT_MOVES',
  MOVE_PIECE='MOVE_PIECE',
  MOVE_OPPONENT='MOVE_OPPONENT',
  CHANGE_SIDE='CHANGE_SIDE',
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
        colorLayout: newColorLayout,
        paletteIndex: index
      }
    // Cases for resetting board
    case 'RESET_BOARD_WHITE':
      const defaultWhiteState: StateType = {
        ...state,
        boardLayout: getDefaultWhiteBoard(),
        currentSide: SideType.White,
        botPieces: getDefaultBlackPieces()
      }
      return defaultWhiteState;
    case 'RESET_BOARD_BLACK':
      const defaultBlackState: StateType = {
        ...state,
        boardLayout: getDefaultBlackBoard(),
        currentSide: SideType.White,
        botPieces: getDefaultWhitePieces()
      }
      return defaultBlackState;
    // Cases to highlight and unhighlight legal moves
    case 'HIGHLIGHT_MOVES':
      const positionFrom = action.payload.from;
      const currentPiece = action.payload.piece;
      // Highlighted moves for pawn
      const colorState = [...state.colorLayout];
      // Get indices in array to highlight
      const highlightedIndices: number[][] = highlight(currentPiece, positionFrom, state.boardLayout);
      // If the highlighted indices come back with possible moves, change color state to reflect that
      if (highlightedIndices[0]) {
        for (let i = 0; i < highlightedIndices.length; i += 1) {
          const currentRow = highlightedIndices[i][0];
          const currentColumn = highlightedIndices[i][1];
          colorState[currentRow][currentColumn] = HighlightedColor;
        }
      }
      return {
        ...state,
        movingPiece: {
          piece: currentPiece,
          from: positionFrom
        },
        colorLayout: colorState
      }
    case 'UN_HIGHLIGHT_MOVES':
      // Unhighlight the whole board
      const colorStateUnhighlight = unhighlightBoard(state.paletteIndex);
      return {
        ...state,
        movingPiece: null,
        colorLayout: colorStateUnhighlight
      }
    // Cases for moving specific pieces
    case 'MOVE_PIECE':
      // Log the current move to the console
      console.log(`Moving ${action.payload.piece} from ${action.payload.from} to ${action.payload.to}`)
      // Get position of to and from payload
      const rowFrom = action.payload.from[0];
      const colFrom = action.payload.from[1];
      const rowTo = action.payload.to[0];
      const colTo = action.payload.to[1];
      // If the position moving to has the king of the opposite side, user checkmates/WINS
      if (state.boardLayout[rowTo][colTo] && state.boardLayout[rowTo][colTo][1] === 'K') {
        alert('Checkmate. You win!');
        // Change color layout so square is not still highlighted
        const unhighlightedState = unhighlightBoard(state.paletteIndex);
        // Return the default board
        return {
          ...state,
          colorLayout: unhighlightedState,
          movingPiece: null,
          boardLayout: getDefaultWhiteBoard(),
          currentSide: SideType.White,
          botPieces: getDefaultBlackPieces()
        }
      };
      // If the current move will capture an enemy piece, return it else null
      const capturedPiece: string | null = captured(action.payload.piece, [rowTo, colTo], state.boardLayout);
      // if (capturedPiece) console.log('Captured Piece:', capturedPiece);
      // Place piece in new position for new layout
      const newLayout = movePiece(action.payload.piece, [rowFrom, colFrom], [rowTo, colTo], state.boardLayout);
      // If a piece was captured, remove it from the bot's pieces
      let newBotPieces: AvailablePiecesType = state.botPieces;
      if (capturedPiece) newBotPieces = removeBotPieces(capturedPiece, state.botPieces);
      // Change color layout so square is not still highlighted
      const unhighlightedState = unhighlightBoard(state.paletteIndex);
      // Change current side to opposite of current side
      const oppositeSide: SideType = state.currentSide === SideType.White ? SideType.Black : SideType.White;
      // Return new state object with new layout as value
      return {
        ...state,
        colorLayout: unhighlightedState,
        movingPiece: null,
        boardLayout: newLayout,
        currentSide: oppositeSide,
        botPieces: newBotPieces
      };
    // Case for moving opponent's (the bot) piece, gets invoked 1 second after user moves
    case 'MOVE_OPPONENT':
      const changedBoard = botMoves(state.boardLayout, state.currentSide);
      return {
        ...state,
        boardLayout: changedBoard,
      }
    // Case for changing moving side
    case 'CHANGE_SIDE':
      let newSide: SideType;
      // If the current side is white, change it to black
      if (state.currentSide === SideType.White) newSide = SideType.Black;
      // If its black, change it to white
      else if (state.currentSide === SideType.Black) newSide = SideType.White;
      // Return the state
      return {
        ...state,
        currentSide: newSide
      }
    // Default
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