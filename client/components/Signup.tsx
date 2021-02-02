import * as React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { BoardContext } from '../BoardContext';
import { SIGNUP_ENDPOINT } from '../constants/endpoints';

interface Props {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Signup: React.FC<Props> = ({ setIsLoading }) => {
  // Context to dispatch login actions
  const { state, dispatch } = React.useContext(BoardContext);
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
    // If no username or password or name, alert user
    if (!username || !password || !firstname || !lastname) {
      clearFields();
      return alert('You must enter a username, password, and your full name.')
    }
    // Fetch from signup endpoint
    fetch(SIGNUP_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username, password, firstname, lastname})
    })
    .then(res => res.json())
    .then(user => {
      // If username is taken, inform user
      if (user.message) {
        clearFields();
        return alert(user.message);
      }
      // Get info about newly registered user
      const registeredUser = {
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname
      }
      // Dispatch action to sign in user
      dispatch({ type: 'SIGNUP_USER', payload: {user: registeredUser} });
      // Redirect to main
      redirectToMain();
    })
    .catch(err => console.error('Error in fetch to signup endpoint:', err));
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