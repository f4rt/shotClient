import React, { Component } from 'react';
import Topbar from './components/topbar/Topbar';
import Feed from './components/Feed/Feed'
import {connect} from 'react-redux';

class App extends Component {

  componentDidMount() {
    let user = JSON.parse(localStorage.getItem('User'));
    if (!user) {localStorage.setItem('User', JSON.stringify({token: ''}))}
    this.props.authCheck(user)
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

const mapDispatchToProps = (dispatch) => {
  return {
    authCheck: (data) => {dispatch({type: 'CHECK_AUTH', data: data})}
  }
}

export default connect(null, mapDispatchToProps)(App);
