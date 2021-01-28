import * as React from 'react';
import { Link } from 'react-router-dom';
import { BoardContext } from '../BoardContext';

export const Login: React.FC = () => {
  // Context to dispatch login actions
  const { state, dispatch } = React.useContext(BoardContext);
  // Function to login as guest
  const loginAsGuest = function() {
    dispatch({ action: 'LOGIN_AS_GUEST' });
  }
  return (
    <div className='login-container'>
      <h1>Login</h1>
      <input className='form-inputs' placeholder='username'></input>
      <input className='form-inputs' placeholder='password'></input>
      <div>
        <button className='auth-button'>Login</button>
        <button className='auth-button'>Continue as Guest</button>
      </div>
      <p>
        No account? Signup <Link to='/signup'>here.</Link>
      </p>
    </div>
  )
}