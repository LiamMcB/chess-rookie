import * as React from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { BoardContext } from '../BoardContext';

interface Props {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Login: React.FC<Props> = ({ setIsLoading }) => {
  // Context to dispatch login actions
  const { state, dispatch } = React.useContext(BoardContext);
  // Use history hook keeps track of the route history
  let history = useHistory();
  // Function to login as guest
  const loginAsGuest = function() {
    dispatch({ type: 'LOGIN_AS_GUEST' });
    // Set is loading to true
    setIsLoading(true);
    // Push the slash route to history, once user is logged in (1 sec for now), redirecting to board
    setTimeout(() => {
      setIsLoading(false);
      history.push('/');
    }, 1000);
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