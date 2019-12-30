import React from 'react'
import {Switch, Route} from 'react-router-dom'

import LogIn from '../../components/user/logIn'
import Register from '../../components/user/register'
import Verify from '../../components/user/verify'
import Logout from '../../components/user/logout'

import UserPage from '../../components/user/userPage'

import UserProfile from '../../components/user/userProfile'
import EditUser from '../../components/user/userForm'

import ForgottenPassword from '../../components/user/forgottenPassword'
import ResetPassword from '../../components/user/resetPassword'

class User extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        return <div>
          <Switch>
            <Route path="/users/login" exact render={() => <LogIn {...this.props} auth={this.props.auth} />} />
            <Route path="/users/register" exact component={Register} />
            <Route path="/users/verify/:username/:verify_hash" exact component={Verify} />

            <Route path="/users/dashboard" exact component={UserProfile} />
            <Route path="/users/edit" exact component={EditUser} />

            <Route path="/users/forgottenPassword" exact component={ForgottenPassword} />
            <Route path="/users/resetPassword/:username/:verify_hash" exact component={ResetPassword} />

            <Route path="/users/logout" exact render={() => <Logout {...this.props} auth={this.props.auth} />} />

            <Route path="/users/:id" exact component={UserPage} />
          </Switch>
        </div>
    }
}

export default User
