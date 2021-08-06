import React, { Component } from 'react';
import { connect } from 'react-redux';

import Post from './PostCard';
import Navigation from './Navigation';
import { getDB } from '../actions/contentActions';

import '../scss/Blog.scss';

class Blog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  }
  loadPosts = async () => {
    let posts = await this.props.getDB('posts');
    this.setState({ posts });
  };
  componentWillMount() {
    this.loadPosts();
  }
  render() {
    return (
      <div className="Blog">
        <Navigation onAdd={this.addPost} />
        <div className="posts">
          {(this.state?.posts || []).map((p) => (
            <Post key={p._id} {...p} />
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { getDB })(Blog);
