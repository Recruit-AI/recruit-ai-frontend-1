import React from 'react'
import {Switch, Route} from 'react-router-dom'

import OurMission from './our_mission'

class Pages extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        return <div style={{minHeight:"100vh"}}>
        <h1>Help Us Out</h1>
        </div>

    }
}

export default Pages
