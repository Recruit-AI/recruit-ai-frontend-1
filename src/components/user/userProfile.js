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
            <h2>Welcome, {curr_user.username}</h2>
            <p>{curr_user.user_email}, {['', 'User', 'Mod', 'Admin'][curr_user.user_role]}</p>
            <h3><i>Dashboard coming soon</i></h3>
        </div>
    }
}

export default Profile
