import React from 'react'
import {Form} from 'react-bootstrap'
import axios from 'axios'

class LogIn extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          user: {
            username: "",
            password: ""
          }
        }
    }

    handleChange = (e) => {
      this.setState({
          user: {
              ...this.state.user,
              [e.target.name]: e.target.value
          }
      })
    }

    handleLogin = (e) => {
      e.preventDefault();
      axios
          .post(`https://grimwire.herokuapp.com/api/users/login`, this.state.user)
          .then(res => {
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('user', JSON.stringify(res.data.user))
            this.props.history.push('/')
          }
          )
          .catch(err => console.log(err) );
    }

    render() {
        return <div style={{height:"100vh"}}>
            <Form onSubmit={this.handleLogin} style={{width:"800px", margin:"auto"}}>
                <Form.Group>
                    <Form.Label>Username or Email</Form.Label>
                    <Form.Control
                      onChange={this.handleChange} type="text"
                      name="username" placeholder="username"
                      value={this.state.user.username} />
                    <Form.Text>Please enter.</Form.Text>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      onChange={this.handleChange} type="password"
                      name="password" placeholder="Password"
                      value={this.state.user.password} />
                    <Form.Text>Please enter.</Form.Text>
                </Form.Group>

                    <button type='submit'>Okie</button>
            </Form>
        </div>
    }
}

export default LogIn
