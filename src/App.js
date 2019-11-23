import React from 'react';
import './App.scss';

import {Container, Row, Col} from 'react-bootstrap'

import Header from './pageComponents/header'
import SideBar from './pageComponents/sidebar'
import Body from './pageComponents/body'
import Footer from './pageComponents/footer'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
      token: null
    }
  }

  logout = () => {
    localStorage.setItem('user', null)
    localStorage.setItem('token', null)
    this.setState({user: {}, token: null})
    window.location.replace('/?loggedIn=false')
  }
  
  login = (user, token) => {
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', token)
    this.setState({user, token})
    this.forceUpdate();
  }

  render () {
    return (
      <div className="App">
        <Header auth={{curr_user: this.state, logout: this.logout, login: this.login}} />
        <Body auth={{curr_user: this.state, logout: this.logout, login: this.login}}  />
        <Footer />
      </div>
    );
  }
}

export default App;
