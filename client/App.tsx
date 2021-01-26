import * as React from 'react';
import { Nav } from './components/Nav';
import { Main } from './components/Main';
import { BoardContext } from './BoardContext';
import { defaultColorLayout, getDefaultBlackPiecesBot, getDefaultWhitePiecesUser, getDefaultWhiteBoard, getGuestUser} from './helper/defaultBoard';
import { ColorLayoutType, SideType } from './helper/types';
import { boardReducer } from './helper/boardReducer';
import { StateType } from './helper/boardReducer';


export const App: React.FC = () => {
  // Default state object
  const defaultState: StateType = {
    boardLayout: getDefaultWhiteBoard(),
    colorLayout: defaultColorLayout,
    paletteIndex: 0,
    movingPiece: null,
    currentSide: SideType.White,
    userPieces: getDefaultWhitePiecesUser(),
    botPieces: getDefaultBlackPiecesBot(),
    history: [],
    user: getGuestUser()
  } 
  // Reducer hook which bundles state-changing functionality
  const [ state, dispatch ] = React.useReducer(boardReducer, defaultState);
  // React.useEffect(() => console.log('User\'s Pieces: \n', state.userPieces[0]), [state.userPieces])
  return (
    <BoardContext.Provider value={{state, dispatch}}>
      <Nav />
      <Main />
    </BoardContext.Provider>
  );
};