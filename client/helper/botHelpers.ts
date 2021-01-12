/* Functions to power the logic behind the chess bot */
import { LayoutType, SideType, AvailablePiecesType } from './types';
import { movePiece, movePieceBot } from './moveHelpers';
import { getPossibleMoves } from './possibleMoves';
import { MovePayload } from './boardReducer';
import { deepCopyArray } from './deepCopy';
import { highlight } from './highlightHelpers';

// Overall function to encapsulate the bot
export const botMoves = function (
  boardLayout: LayoutType,
  currentSide: SideType,
  userPieces: AvailablePiecesType,
  availablePieces: AvailablePiecesType
): LayoutType {
  let newLayout: LayoutType = [...boardLayout];
  // Mapping of side for console logging
  const sideMapping = {
    B: 'Black',
    W: 'White',
  };
  // Function that will calculate which move to make
  const { piece, to, from } = findBestMove(
    boardLayout,
    currentSide,
    userPieces,
    availablePieces
  );
  // const { piece, to, from } = { piece: 'BP', to: [2, 4], from: [1, 4]}
  console.log(`${sideMapping[currentSide]} is moving from ${from} to ${to}!`);
  // Move pawn to test this out
  newLayout = movePieceBot(piece, from, to, boardLayout);
  return newLayout;
};

// Function that calculates the best possible move for the bot
const findBestMove = function (
  boardLayout: LayoutType,
  currentSide: SideType,
  userPieces: AvailablePiecesType,
  availablePieces: AvailablePiecesType
): MovePayload {
  // Variable to keep track of move with highest positive value
  let bestMove = {
    piece: '',
    to: [],
    from: [],
    value: -Infinity,
  };
  // Iterate over all available pieces
  const boardCopy: LayoutType = deepCopyArray(boardLayout); // Need copy since ill null out pieces once i get their moves
  for (let i = 0; i < availablePieces.length; i += 1) {
    const currentPiece: string = availablePieces[i].piece;
    // Find position of current piece
    const currentPosition: number[] = availablePieces[i].index;
    // Find all possible moves, returns an array of [row, col]
    const possibleMoves = getPossibleMoves(
      currentPiece,
      currentPosition,
      boardLayout
    );
    // console.log(`Possible Moves for ${currentPiece}:\n`, possibleMoves);
    // Iterate over possible moves (if there are any) and reset bestMove for larger values
    possibleMoves.forEach((move, index) => {
      const moveValue: number = evaluateMove(currentPiece, currentSide, move, userPieces, boardLayout);
      // If the current move has a greater value, ie performs better, reset best move
      if (moveValue > bestMove.value) {
        bestMove = {
          piece: currentPiece,
          to: move,
          from: currentPosition,
          value: moveValue
        }
      }
    });
  }
  const piece = bestMove.piece;
  const to = bestMove.to;
  const from = bestMove.from;
  // console.log('Best Piece to Move:', piece, 'Value:', bestMove.value);
  // Return move payload back to botMoves function
  return {
    piece,
    to,
    from,
  };
};

// Function to return a numeric value for a specific move (used in findBestMove above)
const evaluateMove = function (
  currentPiece: string,
  currentSide: SideType,
  position: number[],
  userPieces: AvailablePiecesType,
  boardLayout: LayoutType
): number {
  const oppositeSide: SideType =
    currentSide === SideType.White ? SideType.Black : SideType.White;
  const rowTo: number = position[0];
  const colTo: number = position[1];
  // Piece evaluation used to find best move
  const pieceEvaluation = new Map();
  // Current Side is has negative value (lose more value for more important pieces)
  pieceEvaluation.set(currentSide + 'K', -900);
  pieceEvaluation.set(currentSide + 'Q', -90);
  pieceEvaluation.set(currentSide + 'R', -50);
  pieceEvaluation.set(currentSide + 'B', -30);
  pieceEvaluation.set(currentSide + 'N', -30);
  pieceEvaluation.set(currentSide + 'P', -10);
  // Opposite side is positive (want to gain value)
  pieceEvaluation.set(oppositeSide + 'K', 900);
  pieceEvaluation.set(oppositeSide + 'Q', 90);
  pieceEvaluation.set(oppositeSide + 'R', 50);
  pieceEvaluation.set(oppositeSide + 'B', 30);
  pieceEvaluation.set(oppositeSide + 'N', 30);
  pieceEvaluation.set(oppositeSide + 'P', 10);
  // Variable to hold current move's value based on piece evalutaion
  let value: number = 0;
  // If there is a piece of the opposite team in the position moving to, add its value
  if (
    boardLayout[rowTo][colTo] &&
    boardLayout[rowTo][colTo][0] === oppositeSide
  ) {
    value += pieceEvaluation.get(boardLayout[rowTo][colTo]);
  }
  // If there is a risk of getting captured in the position moving to, subtract its value
  const layoutCopy = deepCopyArray(boardLayout);
  for (let userPiece of userPieces) {
    // Find index of the user's piece
    const userIndex: number[] = userPiece.index; 
    // See if the possible moves for that piece coincide with position moving to
    const userMoves: number[][] = highlight(userPiece.piece, userIndex, boardLayout);
    userMoves.forEach(move => {
      if (move[0] === rowTo && move[1] === colTo) {
        console.log('Risk of capture by:', currentPiece);
        value -= pieceEvaluation.get(currentPiece);
        return;
      }
    });
  }
  return value;
};

// Function to remove a captured piece from bot's pieces
export const removeBotPieces = function (
  capturedPiece: string,
  botPieces: AvailablePiecesType
): AvailablePiecesType {
  const botPiecesCopy: AvailablePiecesType = [...botPieces];
  let capturedIndex: number;
  // Find index of captured piece
  botPieces.forEach((piece, index) => {
    if (piece.piece === capturedPiece) capturedIndex = index;
  });
  // Splice captured index out of botPieces and return it
  botPiecesCopy.splice(capturedIndex, 1);
  return botPiecesCopy;
};