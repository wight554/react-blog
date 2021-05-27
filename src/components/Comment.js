import React, { Component } from 'react';

import { connect } from 'react-redux';

class Comment extends Component {
  constructor(props) {
    super(props);
    this.contentEditable = React.createRef();
    this.state = {
      isEdited: false,
      name: this.props.name,
    };
  }
  handleChange = (evt) => {
    this.setState({ name: evt.target.value });
  };
  changeEditState = () => {
    if (this.state.isEdited) this.props.editComment({ ...this.props, name: this.state.name });
    this.setState({ isEdited: !this.state.isEdited });
  };
  render() {
    const { author } = this.props;
    const { lastName, firstName, _id } = author;
    return (
      <div className="Comment">
        {this.state.isEdited ? (
          <textarea value={this.state.name} onChange={this.handleChange} />
        ) : (
          <div>
            <span>
              {firstName} {lastName}
            </span>
            <span>:</span>
            <div className="commentName">{this.state.name}</div>
          </div>
        )}
        {this.props.auth.isAuthenticated && _id === this.props.auth.user.user.id && (
          <div className="buttons">
            <button className="" onClick={this.changeEditState}>
              {this.state.isEdited ? 'Save' : 'Edit'}
            </button>
            <span> </span>
            <button className="" onClick={this.props.onDelete}>
              {' '}
              Delete{' '}
            </button>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(Comment);
