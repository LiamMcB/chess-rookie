import * as React from 'react';
import { Link } from 'react-router-dom';

export const Login: React.FC = () => {
  return (
    <div className='login-container'>
      <h1>Login</h1>
      <input className='form-inputs' placeholder='username'></input>
      <input className='form-inputs' placeholder='password'></input>
      <button className='login-button'>Login</button>
      <p>
        No account? Signup <Link to='/signup'>here.</Link>
      </p>
    </div>
  )
}