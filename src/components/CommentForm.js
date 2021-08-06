import React, { Component } from 'react';

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = { inputValue: '' };
  }
  handleChange = (e) => {
    if (e.target.value.length <= 250) {
      this.setState({
        inputValue: e.target.value,
      });
    }
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.addComment(this.state.inputValue);
    this.setState({
      inputValue: '',
    });
  };
  render() {
    return (
      <form className="CommentForm">
        <textarea
          type="text"
          value={this.state.inputValue}
          onChange={this.handleChange}
          placeholder="Enter your comment here"
        />
        <span>{this.state.inputValue.length}/250</span>
        <button onClick={this.handleSubmit}>Post</button>
      </form>
    );
  }
}

export default CommentForm;
