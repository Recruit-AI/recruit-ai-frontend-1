import React from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {Row, Col} from 'reactstrap'

import UserCard from './userList/userCard'

const curr_user = localStorage.user ?  JSON.parse(localStorage.user) : false
const headers = { headers: {'authorization': localStorage.token} }

class Page extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            searchTerm: "",
            searching: true
        }
    }

    componentDidMount = () => {
      this.loadPage();
    }

    loadPage = () => {
      axios
          .get(`https://grimwire.herokuapp.com/api/users/admin/user-list/${ this.searchTerm !== '' ? `?search=${this.state.searchTerm}` : ''}`, headers)
          .then(res =>
            this.setState({users: res.data, searching: false})
          )
          .catch(err => console.log(err) );
    }

    handleChange = async (e) => {
      await this.setState({searchTerm: e.target.value, searching: true})
      this.loadPage();
    }

    render() {
        const user = this.state.user
        return <div>

          <h2>Manage Users</h2>

          Search By Username: <input value={this.state.searchTerm} onChange={this.handleChange} />

          <Row>
            <Col>Count</Col>
            <Col>Username</Col>
            <Col>Mailing List?</Col>
            <Col>Email</Col>
            <Col>
              Status
            </Col>
            <Col>
              Notes on User
            </Col>
            <Col>
              Un/Ban
            </Col>
            <Col>
              De/Promote
            </Col>

          </Row>
          {
            this.state.users.length === 0 ? (this.state.searching ? "Loading" : "There are no results") : this.state.users.map((user, i) => <div>
                <UserCard user={user} number={i} update={this.loadPage}/>
              </div>
            )
          }
        </div>
    }
}

export default Page
