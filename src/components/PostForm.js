import React, { Component } from 'react';
import { connect } from 'react-redux';

import { createElement } from '../actions/contentActions';

import '../scss/PostForm.scss';

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      title: '',
    };
  }
  addPost = async (val) => {
    const { username, firstName, lastName, id } = this.props.auth.user.user;
    await this.props.createElement('posts', {
      ...val,
      author: id,
    });
    this.props.history.push('/');
  };
  handleChange = (e) => {
    const name = e.target.name;
    this.setState({
      [name]: e.target.value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.addPost({ name: this.state.name, title: this.state.title });
    this.setState({
      name: '',
      title: '',
    });
  };
  render() {
    return (
      <form className="PostForm">
        <input name="title" type="text" value={this.state.title} onChange={this.handleChange} placeholder="Title" />
        <textarea rows="20" name="name" type="text" value={this.state.name} onChange={this.handleChange} />
        <button className="" onClick={this.handleSubmit}>
          Submit
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { createElement })(PostForm);
