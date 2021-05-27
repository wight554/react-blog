import React, { Component } from 'react';

import '../scss/UserForm.scss';

class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: (this.props.user || {}).username || '',
      password: '',
      firstName: (this.props.user || {}).firstName || '',
      lastName: (this.props.user || {}).lastName || '',
    };
  }

  handleChange = (e) => {
    const name = e.target.name;
    this.setState({
      [name]: e.target.value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.submitForm({
      username: this.state.username,
      password: this.state.password,
      ...(this.props.register
        ? {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
          }
        : {}),
      ...(this.props.user
        ? {
            id: this.props.user.id,
          }
        : {}),
    });
  };
  render() {
    return (
      <form className="UserForm">
        {this.props.register && (
          <>
            <input
              name="firstName"
              type="text"
              value={this.state.firstName}
              placeholder="First Name"
              onChange={this.handleChange}
            />
            <input
              name="lastName"
              type="text"
              value={this.state.lastName}
              placeholder="Last Name"
              onChange={this.handleChange}
            />
          </>
        )}
        <input
          name="username"
          type="text"
          value={this.state.username}
          placeholder="username"
          onChange={this.handleChange}
        />
        <input
          name="password"
          type="password"
          value={this.state.password}
          placeholder="password"
          onChange={this.handleChange}
        />
        <button onClick={this.handleSubmit}>Submit</button>
      </form>
    );
  }
}

export default UserForm;
