import React, { Component } from 'react';

import { connect } from 'react-redux';

class Comment extends Component {
  constructor(props){
    super(props);
    this.contentEditable = React.createRef();
    this.state = {
      isEdited: false,
      name: this.props.name,
    };
  }
  handleChange = evt => {
    this.setState({name: evt.target.value});
  };
  changeEditState = () => {
    if(this.state.isEdited)
      this.props.editComment({...this.props, name: this.state.name})
    this.setState({isEdited: !this.state.isEdited});
  }
  render() {
    return (
      <div className='Comment'>
        {
          this.state.isEdited ? 
            <textarea className='' value={this.state.name} onChange={this.handleChange}></textarea>
          :
            <div>
              <span className=''>{this.props.author}</span><span>:</span>
              <div className='commentName'>{this.state.name}</div>
            </div>
        }
        { 
          this.props.auth.isAuthenticated && this.props.author === this.props.auth.user.user.username &&
          <div className='buttons'>
            <button className='' onClick={this.changeEditState}>
            {
              this.state.isEdited ?
                'Save'
              :
                'Edit'
            }
            </button>
            <span> </span>
            <button className='' onClick={this.props.onDelete}> Delete </button>
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps
)(Comment);