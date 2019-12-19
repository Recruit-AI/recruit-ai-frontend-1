import React from 'react'
import {Switch, Route} from 'react-router-dom'

import Home from '../views/home';
import UserComponent from '../views/misc/user';
import AdminComponent from '../views/misc/admin';

import FeedbackComponent from '../views/misc/feedback';
import SupportComponent from '../components/support_tickets/controller';

import PageController from '../components/pages/page-controller'
import PostController from '../components/posts/controller'

import AthleteController from '../components/athletes/controller'
import TeamController from '../components/teams/controller'
import VisitController from '../components/visits/controller'

function Body(props) {
    return <div className="body"><div className="page-container">
        <Switch>
            <Route path="/" exact component={Home} />

            <Route path="/feedback" component={FeedbackComponent} />
            <Route path="/support_tickets" component={SupportComponent} />


            <Route path="/pages" component={PageController} />
            <Route path="/posts" component={PostController} />

            <Route path="/users" render={() => <UserComponent {...props} auth={props.auth} />} />
            <Route path="/admin" component={AdminComponent} />

            <Route path="/athletes" component={AthleteController} />
            <Route path="/teams" component={TeamController} />
            <Route path="/visits" component={VisitController} />

            <Route path="/" render={() => <div className="controller"><div className="tpBlackBg">
                <h2>We're Sorry</h2>
                <h1>ERROR: 404 Page Not Found</h1> 
                <p>Error Code AWFCIM</p>
            </div></div>} />

        </Switch>
    </div></div>
}

export default Body;
