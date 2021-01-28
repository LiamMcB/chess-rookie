import * as React from 'react';
import { Link } from 'react-router-dom';

export const Signup: React.FC = () => {
  return (
    <div className='login-container'>
      <h1>Signup</h1>
      <input className='form-inputs' placeholder='First Name'></input>
      <input className='form-inputs' placeholder='Last Name'></input>
      <input className='form-inputs' placeholder='username'></input>
      <input className='form-inputs' placeholder='password' type='password'></input>
      <button className='auth-button'>Register</button>
      <p>
        Have an account? Login <Link to='/login'>here.</Link>
      </p>
    </div>
  )
}