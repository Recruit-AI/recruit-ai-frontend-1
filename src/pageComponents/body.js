import React from 'react'
import {Switch, Route} from 'react-router-dom'

import Home from '../views/misc/home';
import UserComponent from '../views/misc/user';
import AdminComponent from '../views/misc/admin';
import FeedbackComponent from '../views/misc/feedback';
import ResourcesComponent from '../views/misc/resource';

import SymbolController from '../views/component/symbol/controller';
import PantheonController from '../views/component/pantheon/controller';
import KindController from '../views/component/kind/controller';
import CategoryController from '../views/component/category/controller';

import PagesController from '../views/pages/pages'

function Body(props) {
    return <div className="body"><div className="page-container">
        <Switch>
            <Route path="/" exact component={Home} />

            <Route path="/symbols" component={SymbolController} />
            <Route path="/pantheons" component={PantheonController} />
            <Route path="/collections" component={KindController} />
            <Route path="/categories" component={CategoryController} />

            <Route path="/pages" component={PagesController} />
            <Route path="/feedback" component={FeedbackComponent} />
            <Route path="/resources" component={ResourcesComponent} />

            <Route path="/users" render={() => <UserComponent {...props} auth={props.auth} />} />
            <Route path="/admin" component={AdminComponent} />

            <Route path="/" render={() => <div className="controller"><div className="tpBlackBg">
                <h2>We're Sorry</h2>
                <p>There's totally not any secret information being hidden from you located on this page...</p>
                <h3>...</h3>
                <h3>.</h3>
                <h1>ERROR: 404 Page Not Found</h1> 
            </div></div>} />

        </Switch>
    </div></div>
}

export default Body;
