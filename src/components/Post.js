import React, {Component} from 'react';
import {connect} from 'react-redux';
import CommentForm from './CommentForm';

import Comment from './Comment';

import {
  getElement,
  createElement,
  removeElement,
  updateElement,
} from '../actions/contentActions';

import '../scss/Post.scss';

const isEmpty = require ('is-empty');

class Post extends Component {
  constructor (props) {
    super (props);
    this.state = {
      isEdited: false,
      isLoaded: false,
      name: '',
      comments: [],
    };
  }
  loadPost = async () => {
    let post = await this.props.getElement (
      `posts/${this.props.match.params.id}`
    );
    this.setState ({...post, isLoaded: true});
  };
  deletePost = async () => {
    await this.props.removeElement (`posts/${this.props.match.params.id}`);
    this.props.history.push ('/');
  };
  addComment = async val => {
    let newComment = await this.props.createElement (
      `posts/${this.props.match.params.id}/comments/`,
      {name: val, author: this.props.auth.user.user.username}
    );
    this.setState ({comments: [...this.state.comments, newComment]});
  };
  deleteComment = async id => {
    await this.props.removeElement (
      `posts/${this.props.match.params.id}/comments/${id}`
    );
    const comments = this.state.comments.filter (comment => comment._id !== id);
    this.setState ({comments: comments});
  };
  editComment = async comment => {
    const updatedComment = await this.props.updateElement (
      `posts/${this.props.match.params.id}/comments/${comment._id}`,
      comment.name
    );
    const comments = this.state.comments.map (
      c =>
        c._id === updatedComment._id ? {...c, name: updatedComment.name} : c
    );
    this.setState ({comments: comments});
  };
  onEdit = async () => {
    if (this.state.isEdited) {
      const post = await this.props.updateElement (
        `posts/${this.props.match.params.id}`,
        this.state.name
      );
      this.setState ({...post});
    }
    this.setState ({isEdited: !this.state.isEdited});
  };
  handleChange = evt => {
    this.setState ({name: evt.target.value});
  };
  componentWillMount () {
    this.loadPost ();
  }
  render () {
    let comments = [];
    if (!isEmpty (this.state.comments)) {
      comments = this.state.comments.map (c => (
        <Comment
          key={c._id}
          {...c}
          onDelete={this.deleteComment.bind (this, c._id)}
          editComment={this.editComment}
        />
      ));
    }
    return (
      <div className="Post">
        {this.state.isLoaded &&
          <span>
            <header>
              <span className="title">{this.state.title}</span>
              <span>
                {this.state.author}, {this.state.date.toString ().slice (0, 10)}
              </span>
            </header>
            <img src="https://via.placeholder.com/1000x300" alt="" />
            <article>
              {this.state.isEdited
                ? <textarea
                    className=""
                    value={this.state.name}
                    onChange={this.handleChange}
                  />
                : this.state.name}
            </article>
            {this.props.auth.isAuthenticated &&
              this.state.author === this.props.auth.user.user.username &&
              <div className="buttons">
                <button className="" onClick={this.onEdit}>
                  {this.state.isEdited ? 'Save' : 'Edit'}
                </button>
                <span> </span>
                <button className="" onClick={this.deletePost}> Delete </button>
              </div>}
            <span>Comments:</span>
            <div className="comments">
              {comments}
            </div>
            {this.props.auth.isAuthenticated &&
              <CommentForm addComment={this.addComment} />}
          </span>}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect (mapStateToProps, {
  getElement,
  createElement,
  removeElement,
  updateElement,
}) (Post);
