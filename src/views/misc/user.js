import React from 'react'
import {Switch, Route} from 'react-router-dom'

import LogIn from '../../components/user/logIn'
import UserProfile from '../../components/user/userProfile'

class User extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        return <div>
          <Switch>
            <Route path="/users/login" exact component={LogIn} />
            <Route path="/users/:id" exact component={UserProfile} />
          </Switch>
        </div>
    }
}

export default User
