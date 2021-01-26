import * as React from 'react';
import { Link } from 'react-router-dom';

export const Login: React.FC = () => {
  return (
    <div>
      Login. 
      No account? Signup <Link to='/signup'>here</Link>
    </div>
  )
}