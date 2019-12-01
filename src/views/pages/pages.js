import React from 'react'
import {Switch, Route} from 'react-router-dom'

import OurMission from './pages/our_mission'
import GeneralQuestions from './pages/general_questions'
import Help from './pages/help'
import Features from './pages/features'
import PrivacyPolicy from './pages/privacy-policy'
import MagickStatement from './pages/magick_statement'
import Shop from './pages/shop'


class Pages extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        return <div>
          <Switch>
            <Route path="/pages/mission" exact component={OurMission} />
            <Route path="/pages/questions" exact component={GeneralQuestions} />
            <Route path="/pages/help" exact component={Help} />
            <Route path="/pages/features" exact component={Features} />
            <Route path="/pages/privacy-policy" exact component={PrivacyPolicy} />
            <Route path="/pages/magick-statement" exact component={MagickStatement} />
            <Route path="/pages/shop" exact component={Shop} />
          </Switch>
          <br /> <br /> <br />
        </div>
    }
}

export default Pages
