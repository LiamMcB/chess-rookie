import * as React from 'react';

export const Nav: React.FC = () => {
  return (
    <nav className='main-nav'>
      <ul className='nav-text'>
        <li>
          <h2 className='page-title'>Chess Rookie</h2>
        </li>
        <li>
          <button className='nav-btn'>Logout</button>
        </li>
      </ul>
    </nav>
  )
}