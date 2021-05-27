import React, { Component } from 'react';
import { connect } from 'react-redux';

import UserForm from './UserForm';
import { updateUser } from '../actions/authActions';

class Profile extends Component {
  render() {
    return (
      <>
        <h1 style={{ paddingLeft: '20px' }}>Your profile</h1>
        <UserForm register user={this.props.auth.user.user} submitForm={this.props.updateUser} />;
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { updateUser })(Profile);
