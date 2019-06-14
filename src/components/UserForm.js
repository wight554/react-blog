import React, {Component} from 'react';

import '../scss/UserForm.scss';

class UserForm extends Component {
  constructor (props) {
    super (props);
    this.state = {
      username: '',
      password: '',
    };
  }

  handleChange = e => {
    const name = e.target.name;
    this.setState ({
      [name]: e.target.value,
    });
  };
  handleSubmit = e => {
    e.preventDefault ();
    this.props.submitForm ({
      username: this.state.username,
      password: this.state.password,
    });
    this.setState ({
      username: '',
      password: '',
    });
  };
  render () {
    return (
      <form className="UserForm">
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
        <button onClick={this.handleSubmit}>
          Submit
        </button>
      </form>
    );
  }
}

export default UserForm;
