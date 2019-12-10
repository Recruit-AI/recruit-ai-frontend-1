import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Row, Col } from 'reactstrap'


const curr_user = localStorage.user ? JSON.parse(localStorage.user) : false
const headers = { headers: { 'authorization': localStorage.token } }

class UserCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  banUser = () => {
    axios
      .post(`https://grimwire.herokuapp.com/api/users/admin/ban/`, { user_id: this.props.user.user_id }, headers)
      .then(res => this.props.update())
      .catch(err => console.log(err));

  }

  unbanUser = () => {
    axios
      .post(`https://grimwire.herokuapp.com/api/users/admin/unban/`, { user_id: this.props.user.user_id }, headers)
      .then(res => this.props.update())
      .catch(err => console.log(err));

  }

  promoteUser = () => {
    axios
      .post(`https://grimwire.herokuapp.com/api/users/admin/promote/`, { user_id: this.props.user.user_id, user_role: 1 }, headers)
      .then(res => this.props.update())
      .catch(err => console.log(err));

  }

  promoteMod = () => {
    axios
      .post(`https://grimwire.herokuapp.com/api/users/admin/promote/`, { user_id: this.props.user.user_id, user_role: 2 }, headers)
      .then(res => this.props.update())
      .catch(err => console.log(err));

  }

  promoteAdmin = () => {
    axios
      .post(`https://grimwire.herokuapp.com/api/users/admin/promote/`, { user_id: this.props.user.user_id, user_role: 3 }, headers)
      .then(res => this.props.update())
      .catch(err => console.log(err));

  }

  deleteUser = () => {
    window.confirm(`Are you sure you wish to delete user ${this.props.user.username}? There is no undo.`)
    axios
      .delete(`https://grimwire.herokuapp.com/api/users/${this.props.user.user_id}`, headers)
      .then(res => this.props.update())
      .catch(err => console.log(err));
  }

  render() {
    const user = this.props.user

    return <Row className="user-list-card">
      <Col xs={12} lg={4}>{user.username} (
            {user.user_verified === true ? ['', 'User', 'Mod', 'Admin'][user.user_role] : ""}
        {user.user_verified === false ? "Banned" : ""}
        {user.user_verified === null ? "Unverified" : ""})
          </Col>
      <Col xs={12} lg={4}>
        {user.ban_notes || '+/-'}
      </Col>
      <Col xs={12} lg={4}>
          <Link to={`/users/${user.user_id}`}>View</Link>

          {user.user_verified === false ? <span className="format-link" onClick={this.unbanUser}>Unban</span> : ""}
          {user.user_verified === true ? <span className="format-link" onClick={this.banUser}>Ban</span> : ""}
          {user.user_verified === null ? <span className="format-link" onClick={this.banUser}>Ban</span> : ""}
       


          {user.user_verified === true && user.user_id !== curr_user.user_id && user.user_role < curr_user.user_role ? (
            user.user_role === 1 ? <span className="format-link" onClick={this.promoteMod}>Promote Mod</span> : (
              user.user_role === 2 ? <span><span className="format-link" onClick={this.promoteUser}>Demote User</span><span className="format-link" onClick={this.promoteAdmin}>Promote Admin</span></span> : <span className="format-link" onClick={this.promoteMod}>Demote Mod</span>
            )
          ) : ""}


          {user.user_id !== curr_user.user_id && user.user_role <= curr_user.user_role ?
            <span className="format-link" onClick={this.deleteUser}>Delete</span> : ""}

      </Col>

    </Row>
  }
}

export default UserCard
