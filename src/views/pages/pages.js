import React from 'react'
import {Switch, Route} from 'react-router-dom'

import OurMission from './our_mission'
import GeneralQuestions from './general_questions'
import Help from './help'


class Pages extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        return <div className="page-container">
          <Switch>
            <Route path="/pages/mission" exact component={OurMission} />
            <Route path="/pages/questions" exact component={GeneralQuestions} />
            <Route path="/pages/help" exact component={Help} />
          </Switch>
        </div>
    }
}

export default Pages
