import React from 'react'
import {Switch, Route} from 'react-router-dom'

import OurMission from './our_mission'
import GeneralQuestions from './general_questions'
import Help from './help'
import Features from './features'
import PrivacyPolicy from './privacy-policy'
import MagickStatement from './magick_statement'


class Pages extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        return <div className="page-container tpBlackBg">
          <Switch>
            <Route path="/pages/mission" exact component={OurMission} />
            <Route path="/pages/questions" exact component={GeneralQuestions} />
            <Route path="/pages/help" exact component={Help} />
            <Route path="/pages/features" exact component={Features} />
            <Route path="/pages/privacy-policy" exact component={PrivacyPolicy} />
            <Route path="/pages/magick-statement" exact component={MagickStatement} />
          </Switch>
        </div>
    }
}

export default Pages
