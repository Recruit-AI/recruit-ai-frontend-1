import React from 'react'
import {Switch, Route, Link} from 'react-router-dom'

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
        <h3>Hey, I'm Jordan</h3>
        <p>There's a few people helping out with minor</p>
        <p>But I'm looking to start a group to help build & maintain this site & community</p>
        <p>I've invested hundreds of hours of development time into this project. I am welcoming anyone who wants to
            invest their time to join the team.
        </p>

        <h3>Reasearch/Admin</h3>
        <h5>Researchers</h5>
        <h5>Moderators</h5>

        <h3>Tech</h3>
        <h5>Designers</h5>
        <h5>Testers</h5>
        <h5>Programmers</h5>

        <h3>Business</h3>
        <h5>Copywriting/Marketing</h5>
        <h5>Marketing/Product Development</h5>
        <h5>Advertising/Promotion</h5>

        <Link to="/feedback/provide" className="nice-button">Get in Contact</Link>
        <br /><i>-Via feedback form, select "Other"</i>

        </div></CSSTransition></SwitchTransition>

    }
}

export default Pages
