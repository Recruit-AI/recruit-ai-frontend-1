import React from 'react'
import {Switch, Route} from 'react-router-dom'

import {CSSTransition, SwitchTransition} from 'react-transition-group'
import OurMission from './our_mission'

class Pages extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        return <SwitchTransition><CSSTransition key={`gq`}
          in={true} timeout={350} classNames="whole-page" unmountOnExit appear enter exit><div key="gq" style={{minHeight:"100vh"}}>

        <h1>General Questions</h1>
        <h3>What are...</h3>
        <h5>Pantheons</h5> Google definition: "All the gods of a people or religion collectively." Here, in general, any groups, religions, or cultures<br />
        <h5>Collections</h5> can be "sets" of things- such as Tarot Cards, Astrology Signs, or Chakras;
        or "lists"- such as Dieties and Colors;
        and even "concepts"- such as entries for English Word Meanings and Teachings<br />
        <h5>Categories</h5> are convienent groups for sorting through the Collections<br />
        <h5>Symbols</h5> are the items in the collections.

        </div></CSSTransition></SwitchTransition>

    }
}

export default Pages
