import * as React from 'react';
import { Link } from 'react-router-dom';

export const Forbidden: React.FC = () => {
  return (
    <div className='main-container'>
      <h1>
        403 Forbidden. You don't have access to this page. Please <Link to='/login'>login</Link> first.
      </h1>
    </div>
  )
}