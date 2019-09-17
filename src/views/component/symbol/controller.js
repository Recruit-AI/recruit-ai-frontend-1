import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Index from './index'
import Page from './page'
import Edit from './edit'
import New from './new'

function Controller() {
  return <div class="controller">
    <Switch>
        <Route path="/symbols/" exact component={Index} />
        <Route path="/symbols/new" exact component={New} />
        <Route path="/symbols/:id" exact component={Page} />
        <Route path="/symbols/:id/edit" exact component={Edit} />
    </Switch>
  </div>
}

export default Controller;
