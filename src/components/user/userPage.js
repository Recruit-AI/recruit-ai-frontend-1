import React from 'react'
import {connect} from 'react-redux'
import axios from 'axios'

class Page extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {}
        }
    }

    componentDidMount = () => {
      //${this.props.match.params.id}
        axios
            .get(`https://grimwire.herokuapp.com/api/users/profile/${this.props.match.params.id}`)
            .then(res =>
              this.setState({user: res.data})
            )
            .catch(err => console.log(err) );
    }

    render() {
        const user = this.state.user
        return <div>
          <div className="modUserOptions">
            Ban | Unban
          </div>
          <div className="adminUserOptions">
            Promote | Demote
          </div>
          <h2>{user.username}</h2>
          <p>{['', 'User', 'Mod', 'Admin'][user.user_role]}</p>
          <a href={user.user_link} target="_blank">{user.user_link_description}</a>

          <h4>About</h4>
          <p>{user.bio}</p>
        </div>
    }
}

export default Page
