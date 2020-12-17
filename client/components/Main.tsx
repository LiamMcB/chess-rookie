import * as React from 'react';
import { ChessBoard } from './ChessBoard';
import { colorPalette } from '../public/colorPalette';


export const Main: React.FC = () => {
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

  return (
    <div className='main-container'>
      <div className='button-container'>
        <button>Play</button>
        <button onClick={changeBoardColor}>Change Board Color</button>
      </div>
      <ChessBoard currentPalette={colorPalette[paletteIndex]} />
    </div>
  )
}