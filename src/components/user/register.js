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
            confirmPassword: "",
            user_email: ""
          },
          sent: false,
          error: false,
          formColor: "transparent"
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

    validateEmail = (email) => {
      const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if(email.match(mailformat)){
        return true;
      } else {
        return false;
      }
    }

    handleLogin = (e) => {
      e.preventDefault();
      this.setState({formColor:"rgba(200,200,200,.3)"})

      if(this.state.user.password !== this.state.user.confirmPassword) {
        this.setState({error: "Your passwords do not match.", formColor:"rgba(200,0,0,.3)"})
        setTimeout(() => {this.setState({formColor: 'transparent'})}, 250)
      } else if(!this.validateEmail(this.state.user.user_email)) {
        this.setState({error: "Invalid email address.", formColor:"rgba(200,0,0,.3)"})
        setTimeout(() => {this.setState({formColor: 'transparent'})}, 250)
      } else if(this.state.user.password.length < 6) {
        this.setState({error: "Password is too short.", formColor:"rgba(200,0,0,.3)"})
        setTimeout(() => {this.setState({formColor: 'transparent'})}, 250)
      } else {
        const userInfo = {...this.state.user}
        delete userInfo.confirmPassword
        axios
            .post(`https://grimwire.herokuapp.com/api/users/auth/register`, userInfo)
            .then(res => {
              this.setState({sent: true, error: false, formColor:"rgba(200,0,0,.3)"})
              setTimeout(() => {this.setState({formColor: 'transparent'})}, 250)
            })
            .catch(err => {
              this.setState({error: "Username/email is taken.", formColor:"rgba(200,0,0,.3)"})
              setTimeout(() => {this.setState({formColor: 'transparent'})}, 250)
            });
      }
    }

    render() {
        return <div className="tpBlackBg">
            <h2>Create an Account</h2>
            <p>Creating an account allows you to:</p>
            <p>>Sign up for notifications on the official release</p>
            <p>>Test out editing articles/information</p>
            {this.state.sent ? "Thank you. Please go check your email for the verification link. If you do not see it within a few minutes, please check your spam folder." :
            <Form onSubmit={this.handleLogin} style={{maxWidth:"800px", width:"100%", margin:"auto", backgroundColor:this.state.formColor}}>
            { this.state.error }
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
                <Form.Group>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      onChange={this.handleChange} type="password"
                      name="confirmPassword" placeholder="Confirm Password"
                      value={this.state.user.confirmPassword} />
                    <Form.Text>Please enter.</Form.Text>
                </Form.Group>

                <button className="nice-button" type='submit'>Register Account</button>
            </Form>
            }
        </div>
    }
}

export default LogIn
