import React, { Component } from 'react';
import { connect } from 'react-redux';
import RichTextEditor, { EditorValue } from 'react-rte';
import { EditorState, ContentState } from 'draft-js';

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
  handleChange = (editorValue) => {
    const contentState = editorValue.getEditorState().getCurrentContent();
    const oldContent = this.state.name.getEditorState().getCurrentContent();
    if (contentState === oldContent || contentState.getPlainText().length <= 750) {
      this.setState({ name: editorValue });
    } else {
      const editorState = EditorState.undo(
        EditorState.push(
          this.state.name.getEditorState(),
          ContentState.createFromText(oldContent.getPlainText()),
          'delete-character'
        )
      );
      const editorValue = EditorValue.createFromState(editorState);
      this.setState({ name: editorValue });
    }
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.addPost({ name: this.state.name.toString('html'), title: this.state.title });
    this.setState({
      name: RichTextEditor.createEmptyValue(),
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
        <span>{(this.state.name?.getEditorState()?.getCurrentContent()?.getPlainText() || '').length}/750</span>
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
