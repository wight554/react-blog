import React, {Component} from 'react';

import { createElement } from '../actions/contentActions';

import { connect } from 'react-redux';

import '../scss/PostForm.scss'


class PostForm extends Component {
  constructor(props){
    super(props);
    this.state = 
      {
        name: '',
        title: ''
      };
  }
  addPost = async val => {
    await this.props.createElement('posts', {...val, author: this.props.auth.user.user.username});
    this.props.history.push("/")
  }
  handleChange = (e) => {
    const name = e.target.name
    this.setState({
      [name]: e.target.value,
    });
  }
  handleSubmit = (e) => {
    e.preventDefault()
    this.addPost({name: this.state.name, title: this.state.title});
    this.setState({
        name: '',
        title: ''
    });;
  }
  render() {
    return (
          <form className='PostForm'>
            <input className=''
              name='title'
              type='text' 
              value={this.state.title}
              onChange={this.handleChange}
              placeholder="Title"
            />
            <textarea className='' rows='20'
              name='name'
              type='text' 
              value={this.state.name}
              onChange={this.handleChange}
            />
            <button className=''
              onClick={this.handleSubmit}
            >
              Submit
            </button>
          </form>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});


export default connect(
  mapStateToProps,
  { createElement }
)(PostForm);