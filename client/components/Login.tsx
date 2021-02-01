import * as React from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { BoardContext } from '../BoardContext';

interface Props {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Login: React.FC<Props> = ({ setIsLoading }) => {
  // Context to dispatch login actions
  const { state, dispatch } = React.useContext(BoardContext);
  // State to hold username 
  const [ username, setUsername ] = React.useState('');
  // State to hold password
  const [ password, setPassword ] = React.useState('');
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
    console.log('User:', username, '\n', 'Password:', password);
    // Fetch login data to authenticate user
    clearFields();
  }
  // Function to clear username and password fields
  const clearFields = function() {
    setUsername('');
    setPassword('');
  }
  return (
    <div className='login-container'>
      <h1>Login</h1>
      <input className='form-inputs' placeholder='username' value={username} onChange={(e) => setUsername(e.target.value)} type='text'></input>
      <input className='form-inputs' placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} type='password'></input>
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