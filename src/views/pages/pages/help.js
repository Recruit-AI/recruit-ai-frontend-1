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
        <h3>Hey, I'm Jordan!</h3>
        <p>I have a few close friends helping out with minor things here and there, and I'm trying to get an awesome
            group of people together to really get the word out, and ball rolling.</p>
        <p>I've invested hundreds of hours of development time into this project. I have tons more ideas to code in, too!
            I am welcoming anyone who wants to
            invest their time to join the team (no matter how loosely) and lend a hand!
        </p>

        <h3>In General; Most Important</h3>
        <h5>Writers</h5>
        <p>A Tarot Adept</p>
        <p>Angel/healing/chakra/reiki Adept</p>
        <p>Runes/Wicca/Norse Adept</p>
        <h5>Sharers</h5>
        <p>Share links, articles, and images on social media. Meme it up!</p>

        <h3>Tech</h3>
        <h5>Designers</h5>
        <p>A solid logo would be sweet</p>
        <p>General design for components/pages around the site</p>
        <h5>Testers</h5>
        <p>Break 'em, that's all.</p>
        <h5>Programmers</h5>
        <p>Frontend built on React and SASS, backend built on Node & Express.</p>
        <p>If you don't know those, I need plenty of help writing HTML/CSS and SQL</p>

        <h3>Business</h3>
        <h5>Copywriting/Marketing</h5>
        <p>Help me spruce up this wording a bit</p>
        <h5>Marketing/Product Development</h5>
        <h5>Advertising/Promotion</h5>
        <p>Help me share links</p>

        <Link to="/feedback/provide" className="nice-button">Get in Contact</Link>
        <br /><i>-Via feedback form, select "Other"</i>

        </div></CSSTransition></SwitchTransition>

    }
}

export default Pages
