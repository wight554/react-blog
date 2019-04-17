import React from 'react';

import UserForm from './UserForm'

import { registerUser } from '../actions/authActions';
import { connect } from 'react-redux';

const Register = ({registerUser, history}) => {
  const register = (user) => {
    return registerUser(user, history)
  }
  return (
    <UserForm submitForm={register} />
  )
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { registerUser }
)(Register);