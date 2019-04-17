import React from 'react';

import { Link } from 'react-router-dom';

import { logoutUser } from '../actions/authActions';
import { connect } from 'react-redux';

import '../scss/Header.scss'

const Header = ({ auth, logoutUser }) => {
  const onLogoutClick = e => {
    e.preventDefault();
    logoutUser();
  };
  return (
      <header className='Header'>
        <Link className='title' to="/">
          My noob blog
        </Link>
        {
          auth.isAuthenticated ?
          <div className='options'>
            logged in as <span className=''>{auth.user.user.username}</span>
            <span className=''> | </span>
            <button onClick={onLogoutClick}>logout</button>
          </div>
          :
            <div className='options'>
              <Link className='' to='/login'>
                Login
              </Link>
              <span> </span>
              <Link className='' to='/register'>
                Register
              </Link>
            </div>
        }      
      </header>
  );
}
  
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Header);