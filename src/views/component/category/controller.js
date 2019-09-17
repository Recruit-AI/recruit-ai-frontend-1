import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Index from './index'
import Page from './page'
import Edit from './edit'
import New from './new'

function Controller() {
  return <div class="controller">
    <Switch>
        <Route path="/categories/" exact component={Index} />
        <Route path="/categories/new" exact component={New} />
        <Route path="/categories/:id" exact component={Page} />
        <Route path="/categories/:id/edit" exact component={Edit} />
    </Switch>
  </div>
}

export default Controller;
