import * as React from 'react';
import { Nav } from './components/Nav';
import { Main } from './components/Main';
import { BoardContext } from './BoardContext';
import { defaultColorLayout, getDefaultBlackPiecesBot, getDefaultWhitePiecesUser, getDefaultWhiteBoard, getGuestUser} from './helper/defaultBoard';
import { ColorLayoutType, SideType } from './helper/types';
import { boardReducer } from './helper/boardReducer';
import { StateType } from './helper/boardReducer';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Login } from './components/Login';
import { Signup } from './components/Signup';


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
      <Router>
        <Switch>
          <Route exact path='/'>
            <Nav />
            <Main />
          </Route>
          <Route path='/login'>
            <Nav />
            <Login />
          </Route>
          <Route path='/signup'>
            <Nav />
            <Signup />
          </Route>
        </Switch>
      </Router>
    </BoardContext.Provider>
  );
};