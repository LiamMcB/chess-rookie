import * as React from 'react';
import { ChessBoard } from './ChessBoard';
import { colorPalette } from '../public/colorPalette';
import { defaultBlackBoard, defaultWhiteBoard, PieceMapping } from '../defaultBoard';


export const Main: React.FC = () => {
  // State to manage whether white or black starts
  const [ whiteStarts, setWhiteStarts ] = React.useState(true);
  // State to hold location of all chess pieces
  const [ boardLayout, setBoardLayout ] = React.useState(defaultWhiteBoard);
  // State to represent which color combo were currently on (by index)
  const [ paletteIndex, setPaletteIndex ] = React.useState(0);
  // Function to toggle between color combos in the color palette
  const changeBoardColor = function() {
    // Get length of color palette
    const paletteLength = colorPalette.length;
    // Increment paletteIndex to reset back to zero if index is equal to palette length
    let newPaletteIndex = paletteIndex + 1 >= paletteLength ? 0 : paletteIndex + 1;
    // Set the palette index to the new one
    setPaletteIndex(newPaletteIndex);
  }
  // Function to toggle which side starts and change default board layout
  const changeStartingSide = function() {
    // Change whiteStart to the opposite of what it currently is
    setWhiteStarts(!whiteStarts);
    // Depending on what white starts is, change the default board layout
    whiteStarts ? setBoardLayout(defaultWhiteBoard) : setBoardLayout(defaultBlackBoard);
  }

  return (
    <div className='main-container'>
      <div className='button-container'>
        <button>Play</button>
        <button onClick={changeBoardColor}>Change Board Color</button>
        <button onClick={changeStartingSide}>Choose Side</button>
      </div>
      <ChessBoard currentPalette={colorPalette[paletteIndex]} boardLayout={boardLayout} />
    </div>
  )
}