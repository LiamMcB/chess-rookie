import * as React from 'react';
import { ChessPiece } from './ChessPiece';
import { BoardContext } from '../BoardContext';
import { HighlightedColor } from '../constants/colorPalette';

interface Props {
  // Piece is array in form [row, column]
  piece: number[];
}

export const ChessSquare: React.FC<Props> = ({ piece }) => {
  // State to hold location of all chess pieces
  const { state, dispatch } = React.useContext(BoardContext);
  // State to track whether current square is highlighted or not
  const [ highlighted, setHighlighted ] = React.useState(false);
  // Use effect to toggle highlighted to true if the current color is the highlighted color
  React.useEffect(() => {
    if (state.colorLayout[piece[0]][piece[1]] === HighlightedColor) {
      setHighlighted(true);
    }
  }, [state.colorLayout]);
  // Dispatches action to move piece if square is highlighted and is clicked
  const movePiece = (e) => {
    e.preventDefault();
    // Check if its a legal move
    if (highlighted) {
      // Dispatch move piece
      dispatch({ type: 'MOVE_PIECE', payload: {piece: state.movingPiece.piece, to: [...piece], from: [...state.movingPiece.from]} })
      // Set highlighted to false once it's moved
      setHighlighted(false);
      // Change the current side to the opponent's color
      dispatch({ type: 'MOVE_OPPONENT' });
    } 
  }
  // State to hold the current color of the square
  const [currentColor, setCurrentColor] = React.useState(state.colorLayout[piece[0]][piece[1]]);
  // Use effect to watch for changes in square color and update current color accordingly
  React.useEffect(() => setCurrentColor(state.colorLayout[piece[0]][piece[1]]), [state]);
  // Variable to hold string representation of piece in square position
  const currentPiece: string = state.boardLayout[piece[0]][piece[1]];
  // Changes color to red on hover
  const hoverHandle = () => {
    setCurrentColor('red');
  };
  return (
    <div
      className='chess-square'
      style={{ backgroundColor: currentColor }}
      onMouseEnter={hoverHandle}
      onMouseLeave={() => setCurrentColor(state.colorLayout[piece[0]][piece[1]])}
      onClick={movePiece}
    >
      {/* Only put a piece in position if the piece in position isn't null */}
      {currentPiece && (
        <ChessPiece piece={currentPiece} position={[...piece]} />
      )}
    </div>
  );
};
