import React from 'react'
import {connect} from 'react-redux'

const curr_user = localStorage.user ?  JSON.parse(localStorage.user) : false

class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        return <div className='tpBlackBg'>
            <h2>{curr_user.username}</h2>
            <p>{curr_user.user_email}</p>
            <p>{['', 'User', 'Mod', 'Admin'][curr_user.user_role]}</p>

            <h4>Links</h4>
            Edit Profile<br />
            Logs (if >mod)<br />
            Users (for banning if >mod, promoting if >admin)<br />
        </div>
    }
}

export default Profile
