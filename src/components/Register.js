import React from 'react';
import {connect} from 'react-redux';

import UserForm from './UserForm';
import {registerUser} from '../actions/authActions';

const Register = ({registerUser, history}) => {
  const register = user => {
    return registerUser (user, history);
  };
  return <UserForm submitForm={register} />;
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect (mapStateToProps, {registerUser}) (Register);
