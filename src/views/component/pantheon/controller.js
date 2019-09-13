import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Index from './index'
import Page from './page'
import Edit from './edit'
import New from './new'

function Controller() {
  return <div class="controller">
    <Switch>
        <Route path="/pantheons/" exact component={Index} />
        <Route path="/pantheons/new" exact component={New} />
        <Route path="/pantheons/:id" exact component={Page} />
        <Route path="/pantheons/:id/edit" exact component={Edit} />
    </Switch>
  </div>
}

export default Controller;
