import React from 'react'
import {Form} from 'react-bootstrap'
import axios from 'axios'
import {withRouter} from 'react-router-dom'

class LogIn extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          user: {
            username: "",
            password: ""
          },
          formColor: 'transparent',
          error: null,
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
      this.setState({formColor: 'rgba(255,255,255,.4)'})
      e.preventDefault();
      console.log("LOGIN", this.props.auth)
      axios
          .post(`https://grimwire.herokuapp.com/api/users/auth/login`, this.state.user)
          .then(res => {
            this.setState({formColor: 'rgba(0,200,0,.4)'})
            this.props.auth.login( res.data.user, res.data.token )
            setTimeout(() => {this.props.history.push('/')}, 200)

          })
          .catch((err, res) => {
            console.log(err, err.response.data.message)
            if(err.response.data.message === "Invalid Credentials.") {
              this.setState({formColor: 'rgba(200,0,0,.4)', error: "The information you entered does not match our records. Please try again."})
              setTimeout(() => {this.setState({formColor: 'transparent'})}, 2000)

            }
          });
    }

    render() {
        return <div className="tpBlackBg">
          {this.state.error || ""}
            <Form onSubmit={this.handleLogin} style={{width:"800px", margin:"auto", backgroundColor: this.state.formColor}}>
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

export default withRouter( LogIn )
