import * as React from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { BoardContext } from '../BoardContext';

export const Login: React.FC = () => {
  // Context to dispatch login actions
  const { state, dispatch } = React.useContext(BoardContext);
  // Use history hook keeps track of the route history
  let history = useHistory();
  // Function to login as guest
  const loginAsGuest = function() {
    dispatch({ type: 'LOGIN_AS_GUEST' });
    // Push the slash route to history, once user is logged in, redirecting to board
    history.push('/');
  }
  // Function to login the user
  const loginUser = function() {

  }
  return (
    <div className='login-container'>
      <h1>Login</h1>
      <input className='form-inputs' placeholder='username'></input>
      <input className='form-inputs' placeholder='password'></input>
      <div>
        <button className='auth-button' onClick={loginUser}>Login</button>
        <button className='auth-button' onClick={loginAsGuest}>Continue as Guest</button>
      </div>
      <p>
        No account? Signup <Link to='/signup'>here.</Link>
      </p>
    </div>
  )
}