import React from 'react'
import {Switch, Route} from 'react-router-dom'

import UserList from '../../components/admin/userList'
import LogComponent from '../../components/admin/logComponent'
class User extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        return <div>
          <Switch>
            <Route path="/admin/users" exact component={UserList} />
            <Route path="/admin/logs" exact component={LogComponent} />
          </Switch>
        </div>
    }
}

export default User
