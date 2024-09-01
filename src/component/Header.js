import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header>
      <Link to="/" className='logo'>CodeSnippeX</Link>
      <nav>
        {user ? (
          <>
            <Link to="/add" className='btns'>Add Snippet</Link>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className='btns'>Login</Link>
            <Link to="/register" className='btns'>Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;