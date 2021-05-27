import React, { Component } from 'react';
import { connect } from 'react-redux';

import UserForm from './UserForm';
import { loginUser } from '../actions/authActions';

class Login extends Component {
  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/');
    }
  }

  render() {
    return (
      <>
        <h1 style={{ paddingLeft: '20px' }}>Login</h1>
        <UserForm submitForm={this.props.loginUser} />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { loginUser })(Login);
