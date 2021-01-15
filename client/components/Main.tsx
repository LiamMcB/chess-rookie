import * as React from 'react';
import { ChessBoard } from './ChessBoard';
import { ColorPalette } from '../constants/colorPalette';
import { BoardContext } from '../BoardContext';
import { SideType } from '../helper/types';


export const Main: React.FC = () => {
  // State to manage whether the user is white or black
  const [ isWhite, setIsWhite ] = React.useState(true);
  // State to hold location of all chess pieces, type info in boardReducer.ts
  const { state, dispatch } = React.useContext(BoardContext);
  // State to represent which color combo were currently on (by index)
  const [ paletteIndex, setPaletteIndex ] = React.useState(0);
  // Use effect hook to listen for changes on palette index and dispatch action if needed
  React.useEffect(() => {
    dispatch({type: 'CHANGE_COLOR_PALETTE', payload: {paletteIndex}})
  }, [paletteIndex]);
  // Function reset board for new game
  const resetBoard = function() {
    setIsWhite(true);
    dispatch({type: 'UN_HIGHLIGHT_MOVES'});
    dispatch({type: 'RESET_BOARD_WHITE'});
  }
  // Function to toggle between color combos in the color palette
  const changeBoardColor = function() {
    // Get length of color palette
    const paletteLength = ColorPalette.length;
    // Increment paletteIndex to reset back to zero if index is equal to palette length
    let newPaletteIndex = paletteIndex + 1 >= paletteLength ? 0 : paletteIndex + 1;
    // Set the palette index to the new one
    setPaletteIndex(newPaletteIndex);
  }
  // Function to toggle which side the user plays as and change default board layout
  const changeSide = function() {
    // Change the users side to the opposite of what it is now
    setIsWhite(!isWhite);
    // Unhighlight if any squares still highlighted
    dispatch({type: 'UN_HIGHLIGHT_MOVES'});
    // Depending on what side the user is on, change the default board layout
    !isWhite ? dispatch({type: 'RESET_BOARD_WHITE'}) : dispatch({type: 'RESET_BOARD_BLACK'});
    // If the board gets changed to black, make white move (the bot)
    if (isWhite) {
      // Wait 1 second, then move the bot's piece
      setTimeout(() => {
        // Dispatch action for bot to move
        dispatch({ type: 'MOVE_OPPONENT' });
        // Set the current side back to the users side
        dispatch({ type: 'CHANGE_SIDE' });
      }, 1000);
    }
  }
  // Styling color for buttons
  const buttonStyle = {backgroundColor: ColorPalette[paletteIndex].dark, color: ColorPalette[paletteIndex].light};

  return (
    <div className='main-container'>
      <div className='button-container'>
        <button onClick={changeBoardColor} style={buttonStyle}>Change Theme</button>
        <button onClick={resetBoard} style={buttonStyle}>New Game</button>
        <button onClick={changeSide} style={buttonStyle}>Choose Side</button>
      </div>
      <ChessBoard paletteIndex={paletteIndex} />
    </div>
  )
}