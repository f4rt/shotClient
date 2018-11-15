import React, { Component } from 'react';
import Topbar from './components/topbar/Topbar';
import Feed from './components/Feed/Feed'
import {connect} from 'react-redux';
import {checkAuth} from './actions/auth'

class App extends Component {

  componentDidMount() {
    let user = JSON.parse(localStorage.getItem('User'));
    if (!user) {localStorage.setItem('User', JSON.stringify({token: ''}))}
    this.props.checkAuth(user)
  }

  render() {
    return (
      <div className="App">
        <Topbar />
        <Feed />
      </div>
    );
  }
}

export default connect(null, {checkAuth})(App);
