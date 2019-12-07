import React from 'react'
import {Switch, Route} from 'react-router-dom'

import Resources from '../../components/resources/index'
import ResourcesShow from '../../components/resources/page'
import ResourcesNew from '../../components/resources/new'
import ResourcesEdit from '../../components/resources/edit'

class ResourcesController extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        return <div>
          <Switch>
            <Route path="/resources" exact component={Resources} />
            <Route path="/resources/new" exact component={ResourcesNew} />
            <Route path="/resources/:id/edit" exact component={ResourcesEdit} />
            <Route path="/resources/:id" exact component={ResourcesShow} />
          </Switch>
        </div>
    }
}

export default ResourcesController
