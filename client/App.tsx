import * as React from 'react';
import { Nav } from './components/Nav';
import { Main } from './components/Main';
import { BoardContext } from './BoardContext';
import { defaultColorLayout, getDefaultBlackPiecesBot, getDefaultWhitePiecesUser, getDefaultWhiteBoard, getGuestUser} from './helper/defaultBoard';
import { ColorLayoutType, SideType } from './helper/types';
import { boardReducer } from './helper/boardReducer';
import { StateType } from './helper/boardReducer';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { Loading } from './components/Loading';
import { Forbidden } from './components/Forbidden';


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
    user: getGuestUser(),
    authenticated: false
  } 
  // Reducer hook which bundles state-changing functionality
  const [ state, dispatch ] = React.useReducer(boardReducer, defaultState);
  // State which determines whether the loading page appears or not
  const [ isLoading, setIsLoading ] = React.useState(false);
  // React.useEffect(() => console.log('User\'s Pieces: \n', state.userPieces[0]), [state.userPieces])
  return (
    <BoardContext.Provider value={{state, dispatch}}>
      <Router>
        <Nav />
        <Switch>
          <Route exact path='/'>
            { state.authenticated && <Main /> }
            { !state.authenticated && <Forbidden /> }
          </Route>
          <Route path='/login'>
            { !isLoading && <Login setIsLoading={setIsLoading} /> }
            { isLoading && <Loading /> }
          </Route>
          <Route path='/signup'>
            <Signup />
          </Route>
        </Switch>
      </Router>
    </BoardContext.Provider>
  );
};