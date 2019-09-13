import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Index from './index'
import Page from './page'
import Edit from './edit'
import New from './new'

function Controller() {
  return <div class="controller">
    <Switch>
        <Route path="/" exact component={Index} />
        <Route path="/:id" exact component={Page} />
        <Route path="/:id/edit" exact component={Edit} />
        <Route path="/new" exact component={New} />
    </Switch>
  </div>
}

export default Controller;
