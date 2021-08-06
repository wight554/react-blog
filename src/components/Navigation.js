import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Navigation = ({ auth }) => {
  return (
    <nav className="Navigation">
      <button>placeholder</button>
      <button>placeholder</button>
      <button>placeholder</button>
      {auth.isAuthenticated && (
        <Link className="newPost" to="/newpost">
          <button>
            <i className="fas fa-edit" />
          </button>
        </Link>
      )}
    </nav>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Navigation);
