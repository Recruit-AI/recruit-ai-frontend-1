import React from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {Row, Col} from 'reactstrap'


const curr_user = localStorage.user ?  JSON.parse(localStorage.user) : false
const headers = { headers: {'authorization': localStorage.token} }

class UserCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    banUser = () => {
      axios
          .post(`https://grimwire.herokuapp.com/api/users/admin/ban/`, {user_id: this.props.user.user_id}, headers)
          .then(res => this.props.update())
          .catch(err => console.log(err));

    }

    unbanUser = () => {
      axios
          .post(`https://grimwire.herokuapp.com/api/users/admin/unban/`, {user_id: this.props.user.user_id}, headers)
          .then(res => this.props.update())
          .catch(err => console.log(err));

    }

    promoteUser = () => {
      axios
          .post(`https://grimwire.herokuapp.com/api/users/admin/promote/`, {user_id: this.props.user.user_id, user_role: 1}, headers)
          .then(res => this.props.update())
          .catch(err => console.log(err));

    }

    promoteMod = () => {
      axios
          .post(`https://grimwire.herokuapp.com/api/users/admin/promote/`, {user_id: this.props.user.user_id, user_role: 2}, headers)
          .then(res => this.props.update())
          .catch(err => console.log(err));

    }

    promoteAdmin = () => {
      axios
          .post(`https://grimwire.herokuapp.com/api/users/admin/promote/`, {user_id: this.props.user.user_id, user_role: 3}, headers)
          .then(res => this.props.update())
          .catch(err => console.log(err));

    }

    render() {
        const user = this.props.user

        return <Row>
          <Col>{user.username}</Col>
          <Col>{user.email}</Col>
          <Col>
            {user.user_verified === true ? ['', 'User', 'Mod', 'Admin'][user.user_role] : ""}
            {user.user_verified === false ? "Banned" : ""}
            {user.user_verified === null ? "Unverified" : ""}
          </Col>
          <Col>
            {user.ban_notes || 'n/a'}
          </Col>
          <Col>
            {user.user_verified === false ? <span onClick={this.unbanUser}>Unban</span> : ""}
            {user.user_verified === true ? <span onClick={this.banUser}>Ban</span> : ""}
            {user.user_verified === null ? <span onClick={this.banUser}>Ban</span> : ""}
          </Col>
          <Col>
            {user.user_verified === true ? (
              user.user_role === 1 ? <span onClick={this.promoteMod}>Promote Mod</span> : (
                user.user_role === 2 ? <span><span onClick={this.promoteUser}>Demote User</span> | <span onClick={this.promoteAdmin}>Promote Admin</span></span> : <span onClick={this.promoteMod}>Demote Mod</span>
              )
            ) : "x"}
          </Col>

        </Row>
    }
}

export default UserCard
