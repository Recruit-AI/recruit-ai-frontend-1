import React from 'react'
import {Switch, Route} from 'react-router-dom'

import OurMission from './our_mission'
import {CSSTransition, SwitchTransition} from 'react-transition-group'

class Pages extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        return <SwitchTransition><CSSTransition key={`help`}
          in={true} timeout={350} classNames="whole-page" unmountOnExit appear enter exit><div key="help" style={{minHeight:"100vh"}}>
        <h1>Help Us Out</h1>
        </div></CSSTransition></SwitchTransition>

    }
}

export default Pages
