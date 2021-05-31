import React, { Component } from 'react';
import { connect } from 'react-redux';
import RichTextEditor from 'react-rte';

import { createElement } from '../actions/contentActions';

import '../scss/PostForm.scss';

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: RichTextEditor.createEmptyValue(),
      title: '',
    };
  }
  addPost = async (val) => {
    const { id } = this.props.auth.user.user;
    await this.props.createElement('posts', {
      ...val,
      author: id,
    });
    this.props.history.push('/');
  };
  handleInputChange = (e) => {
    const name = e.target.name;
    this.setState({
      [name]: e.target.value,
    });
  };
  handleChange = (value) => {
    this.setState({ name: value });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.addPost({ name: this.state.name.toString('html'), title: this.state.title });
    this.setState({
      name: '',
      title: '',
    });
  };
  render() {
    return (
      <form className="PostForm">
        <input
          name="title"
          type="text"
          value={this.state.title}
          onChange={this.handleInputChange}
          placeholder="Title"
        />
        <RichTextEditor value={this.state.name} onChange={this.handleChange} />
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
