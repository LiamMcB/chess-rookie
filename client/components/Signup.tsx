import * as React from 'react';
import { Link, useHistory } from 'react-router-dom';

interface Props {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Signup: React.FC<Props> = ({ setIsLoading }) => {
  // State to hold username 
  const [ username, setUsername ] = React.useState('');
  // State to hold password
  const [ password, setPassword ] = React.useState('');
  // State to hold firstname
  const [ firstname, setFirstName ] = React.useState('');
  // State to hold lastname
  const [ lastname, setLastName ] = React.useState('');
  // Use history hook keeps track of the route history
  let history = useHistory();
  // Function to register a new user
  const signupUser = function() {
    // PUT SIGNUP FETCH HERE
  }
  // Function to clear username and password fields
  const clearFields = function() {
    setUsername('');
    setPassword('');
    setFirstName('');
    setLastName('');
  }
  // Function to redirect to main after a second for authenticating and giving time for reducer
  const redirectToMain = function() {
    // Set is loading to true
    setIsLoading(true);
    // Clear fields in the input form
    clearFields();
    // Push the slash route to history, once user is logged in (1 sec for now), redirecting to board
    setTimeout(() => {
      setIsLoading(false);
      history.push('/');
    }, 1000);
  }
  return (
    <div className='login-container'>
      <h1>Signup</h1>
      <input className='form-inputs' value={firstname} onChange={(e) => setFirstName(e.target.value)} placeholder='First Name'></input>
      <input className='form-inputs' value={lastname} onChange={(e) => setLastName(e.target.value)} placeholder='Last Name'></input>
      <input className='form-inputs' value={username} onChange={(e) => setUsername(e.target.value)} placeholder='username'></input>
      <input className='form-inputs' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='password' type='password'></input>
      <button className='auth-button' onClick={signupUser}>Register</button>
      <p>
        Have an account? Login <Link to='/login'>here.</Link>
      </p>
    </div>
  )
}