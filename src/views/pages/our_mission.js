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

        return <SwitchTransition><CSSTransition key={`mission`}
          in={true} timeout={350} classNames="whole-page" unmountOnExit appear enter exit><div key="mission" style={{minHeight:"100vh"}}>
          <h1>Our Mission</h1>
          <div style={{display:"flex"}}>
            <div style={{textAlign:'left',height:'200px', padding: "20px", width:"33%"}}>
              <div style={{}}>
                <img src="https://images.pexels.com/photos/590493/pexels-photo-590493.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" width="250px" />
                <h3>1. Provide a free knowledge base for everyone to use, regardless of belief, or lack thereof.</h3>
              </div>
            </div>
            <div style={{textAlign:'center',height:'200px', padding: "20px", width:"33%"}}>
              <div style={{}}>
                <h3>2. Build a community for those who want to spread their knowledge & wisdom, grow & learn, and connect with others</h3>
                <img src="https://images.pexels.com/photos/1144283/pexels-photo-1144283.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" width="250px" />
              </div>
            </div>
            <div style={{textAlign:'right',height:'200px', padding: "20px", width:"33%"}}>
              <div style={{}}>
                <img src="https://images.pexels.com/photos/220483/pexels-photo-220483.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" width="250px" />
                <h3>3. Provide tools & resources for personal use</h3>
                Coming Soon:<br />
                Astrology Clock & Birthcharts<br />
                Herb Shelf & Store<br />
              </div>
            </div>
        </div></div></CSSTransition></SwitchTransition>


    }
}

export default Pages
