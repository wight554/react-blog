import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { logoutUser } from '../actions/authActions';

import '../scss/Header.scss';

const Header = ({ auth, logoutUser }) => {
  const onLogoutClick = (e) => {
    e.preventDefault();
    logoutUser();
  };
  return (
    <header className="Header">
      <Link className="title" to="/">
        Blog demo
      </Link>
      {auth.isAuthenticated ? (
        <div className="options">
          logged in as{' '}
          <span>
            <Link to="/profile">{auth.user.user.username}</Link>
          </span>
          <span> | </span>
          <button onClick={onLogoutClick}>logout</button>
        </div>
      ) : (
        <div className="options">
          <Link to="/login">Login</Link>
          <span> </span>
          <Link to="/register">Register</Link>
        </div>
      )}
    </header>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Header);
