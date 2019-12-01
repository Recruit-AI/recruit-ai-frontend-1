import React from 'react'
import {Switch, Route, Link} from 'react-router-dom'
import {Row, Col} from 'reactstrap'

import {CSSTransition, SwitchTransition} from 'react-transition-group'
import OurMission from './our_mission'

class Pages extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {

        return <SwitchTransition><CSSTransition key={`mission`}
          in={true} timeout={350} classNames="whole-page" unmountOnExit appear enter exit><div key="mission" style={{minHeight:"100vh"}}>
          <h1>Our Mission</h1>
          <Row>
            <Col lg={4} xs={12} style={{textAlign:'left', padding: "20px"}}>
              <div style={{}}>
                <img src="https://images.pexels.com/photos/590493/pexels-photo-590493.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" width="250px" />
                <h3>1. Provide a free, community-driven knowledge base for everyone to use, regardless of belief, or lack thereof.</h3>
              </div>
            </Col>
            <Col lg={4} xs={12} style={{textAlign:'center', padding: "20px"}}>
              <div style={{}}>
                <h3>2. Build a community for those who want to spread their knowledge & wisdom, grow & learn, and connect with others, yet still not be overloaded
                into the social aspect.</h3>
                <img src="https://images.pexels.com/photos/1144283/pexels-photo-1144283.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" width="250px" />
              </div>
            </Col>
            <Col lg={4} xs={12} style={{textAlign:'right', padding: "20px"}}>
              <div style={{}}>
                <img src="https://images.pexels.com/photos/220483/pexels-photo-220483.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" width="250px" />
                <h3>3. Provide necessary tools, organization, & resources for personal use, that are slick and modern, look good and feel good.</h3>
              </div>
            </Col>
        </Row>


        <div>
          <Link className="nice-button" to="/users/register">Register as a User</Link><br />
          -get updates on official releases<br />
          -become a beta tester and instantly try out the editing system
        </div>

        <div>
          <Link className="nice-button nice-button-primary" to="/feedback/provide">Leave some Feedback</Link><br />
          -Any feedback at all is appreciated.<br />
        </div>

      </div></CSSTransition></SwitchTransition>


    }
}

export default Pages
