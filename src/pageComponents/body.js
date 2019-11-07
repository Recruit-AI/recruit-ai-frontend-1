import React from 'react'
import {Switch, Route} from 'react-router-dom'

import Home from '../views/misc/home';
import UserComponent from '../views/misc/user';
import AdminComponent from '../views/misc/admin';

import SymbolController from '../views/component/symbol/controller';
import PantheonController from '../views/component/pantheon/controller';
import KindController from '../views/component/kind/controller';
import CategoryController from '../views/component/category/controller';

import PagesController from '../views/pages/pages'

function Body() {
    return <div className="body">
        <Switch>
            <Route path="/" exact component={Home} />

            <Route path="/symbols" component={SymbolController} />
            <Route path="/pantheons" component={PantheonController} />
            <Route path="/collections" component={KindController} />
            <Route path="/categories" component={CategoryController} />
            
            <Route path="/pages" component={PagesController} />

            <Route path="/users" component={UserComponent} />
            <Route path="/admin" component={AdminComponent} />
        </Switch>
    </div>
}

export default Body;
