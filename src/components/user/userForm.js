import React from 'react'
import axios from 'axios'
import {Form} from 'react-bootstrap'
import api from '../../helpers/api'


const curr_user = localStorage.user ?  JSON.parse(localStorage.user) : false
const headers = { headers: {'authorization': localStorage.token} }

class UserForm extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        user: curr_user,
        formColor: "transparent"
      }
  }

  submitForm = (e) => {
    e.preventDefault();
    axios
        .put(api.userPath(`/edit`), this.state.user, headers)
        .then(res => {
          if(res.status === 200) {
            localStorage.setItem('user', JSON.stringify(res.data))
            this.setState({formColor: "rgba(0,200,0,.4)"})
            setTimeout(() => {this.setState({formColor: "transparent"})}, 500)
          } else {
            console.log(res)
          }
        })
        .catch(err => console.log(err) );
  }

  handleChange = (e) => {
    this.setState({ user: {...this.state.user, [e.target.name]: e.target.value}})
  }


        handleCheck = (e) => {
            this.setState({
                user: {
                    ...this.state.user,
                    [e.target.name]: e.target.checked
                }
            })
        }


  render() {
    return <div className="tpBlackBg">
        { !this.state.sent ?
        <div>
          <h2>Account Settings</h2>
          <Form onSubmit={this.submitForm} className="handlerForm" style={{width:'100%', maxWidth: '800px', margin:'auto',backgroundColor:this.state.formColor}}>

            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control onChange={this.handleChange} type="text"
                name={ "user_email" } placeholder={ "Email" }
                value={this.state.user[ "user_email" ]} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control onChange={this.handleChange} type="text"
                name={ "username" } placeholder={ "Username" }
                value={this.state.user[ "username" ]} />
            </Form.Group>

            <Form.Group>
                <Form.Label>Recieve email updates?</Form.Label>
                <Form.Control
                  onChange={this.handleCheck} type="checkbox"
                  name="mailing_list"
                  checked={this.state.user.mailing_list} />
                <Form.Text>We don't send spam, we keep your email address secure, and we make our "Unsubscribe" button easy to find.</Form.Text>
            </Form.Group>

            {JSON.stringify(this.state.user)}

            <button type='submit'>Submit</button>

          </Form>
        </div>

        : "Thank you for your input!"
      }


      </div>
    }

}

export default UserForm
