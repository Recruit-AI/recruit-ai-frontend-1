import React from 'react'
import {Switch, Route} from 'react-router-dom'

import LogIn from '../../components/user/logIn'
import Register from '../../components/user/register'
import UserProfile from '../../components/user/userProfile'
import UserPage from '../../components/user/userPage'
import EditUser from '../../components/user/userForm'

class User extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        return <div className="tpBlackBg">
          <Switch>
            <Route path="/users/login" exact component={LogIn} />
            <Route path="/users/register" exact component={Register} />
            <Route path="/users/profile" exact component={UserProfile} />
            <Route path="/users/edit" exact component={EditUser} />
            <Route path="/users/:id" exact component={UserPage} />
          </Switch>
        </div>
    }
}

export default User
