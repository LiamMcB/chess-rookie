import * as React from 'react';
import { BoardContext } from '../BoardContext';
import { useHistory } from 'react-router-dom';

export const Nav: React.FC = () => {
  // Get state to see if user is authenticated or not
  const { state, dispatch } = React.useContext(BoardContext);
  // Hook into history to redirect to slash on logout
  const history = useHistory();
  // Function to logout user and return state to official state
  const logoutUser = function() {
    dispatch({type: 'LOGOUT_USER'});
    redirectToMain();
  }
  // Function to redirect to main after a second for logging out and giving time for reducer
  const redirectToMain = function() {
    // Push the slash route to history, once user is logged in (1 sec for now), redirecting to board
    setTimeout(() => {
      history.push('/');
    }, 1000);
  }

  return (
    <nav className='main-nav'>
      <ul className='nav-text'>
        <li>
          <h2 className='page-title'>Chess Rookie</h2>
        </li>
        <li>
          {state.authenticated && <button className='nav-btn' onClick={logoutUser}>Logout</button>}
        </li>
      </ul>
    </nav>
  )
}