import React from 'react'
import {Form} from 'react-bootstrap'
import axios from 'axios'

class LogIn extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          user: {
            username: "",
            password: "",
            user_email: ""
          },
          sent: false
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
          .post(`https://grimwire.herokuapp.com/api/users/auth/register`, this.state.user)
          .then(res => { this.setState({sent: true})})
          .catch(err => console.log(err) );
    }

    render() {
        return <div className="tpBlackBg">
            {this.state.sent ? "Thank you. Please go check your email for the verification link." : 
            <Form onSubmit={this.handleLogin} style={{width:"800px", margin:"auto"}}>
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      onChange={this.handleChange} type="text"
                      name="username" placeholder="username"
                      value={this.state.user.username} />
                    <Form.Text>Please enter.</Form.Text>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      onChange={this.handleChange} type="text"
                      name="user_email" placeholder="user_email"
                      value={this.state.user.user_email} />
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

                <button type='submit'>Register Account</button>
            </Form>
            }
        </div>
    }
}

export default LogIn
