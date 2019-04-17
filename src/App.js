import React, { Component } from 'react';
import './App.css';
import Blog from './components/Blog'
import Header from './components/Header'
import Login from './components/Login';
import Post from './components/Post';
import PostForm from './components/PostForm';
import Register from './components/Register';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from "react-router-dom";

import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import store from './store';
import { setCurrentUser, logoutUser } from './actions/authActions';

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = './login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className='App'>
            <Header/>
            <Route exact path="/" component={Blog} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/newpost" component={PostForm} />
            <Route exact path="/posts/:id" component={Post} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
