import React from 'react'
import {Switch, Route} from 'react-router-dom'

import Home from '../views/home';
import UserComponent from '../views/misc/user';
import AdminComponent from '../views/misc/admin';
import FeedbackComponent from '../views/misc/feedback';


function Body(props) {
    return <div className="body"><div className="page-container">
        <Switch>
            <Route path="/" exact component={Home} />

            <Route path="/feedback" component={FeedbackComponent} />

            <Route path="/users" render={() => <UserComponent {...props} auth={props.auth} />} />
            <Route path="/admin" component={AdminComponent} />

            <Route path="/" render={() => <div className="controller"><div className="tpBlackBg">
                <h2>We're Sorry</h2>
                <h1>ERROR: 404 Page Not Found</h1> 
            </div></div>} />

        </Switch>
    </div></div>
}

export default Body;
