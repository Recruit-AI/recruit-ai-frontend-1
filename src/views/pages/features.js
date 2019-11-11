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
          <h1>Features</h1>
          <h4>I made this app because I was frustrated at the lack of organization and reliablity when it came to existing apps/resources.</h4>

          <p>GrimWire is a wiki-like application that makes it easy to see the vast relationships between ideas, cultures, and magickal objects.</p>

          <p>Anyone can create an account and sign-up, editing & creating content, while moderators & admins have access to banning & undoing changes, ensuring everything has a reliable source.</p>

          <h2>Collections & Lists</h2>
          <p>-See what these things have in common, and all of the collection on one page.</p>
          <p>-See which pantheons created & use each collection.</p>
          <p>-Search through Collections including, but not limited to:</p>
          <div><Link className="nice-button" to="/collections/3">Astrology Signs</Link></div>
          <div><Link className="nice-button" to="/collections/23">Animals</Link></div>
          <div><Link className="nice-button" to="/collections/36">Archangels</Link></div>
          <div><Link className="nice-button" to="/collections/4">Chakras</Link></div>
          <div><Link className="nice-button" to="/collections/28">Colors</Link></div>
          <div><Link className="nice-button" to="/collections/8">Flowers & Herbs</Link></div>
          <div><Link className="nice-button" to="/collections/1">Tarot Cards</Link></div>


          <h2>Pantheons & Cultures</h2>
          <p>-See which pantheons & religions inspired others, who they worshiped & what they believed.</p>
          <p>-See which other groups they influenced & who influenced them (show christian & Buddhist)</p>
          <p>-Search Pantheons like:</p>
          <div><Link className="nice-button" to="/pantheons/9">Buddhism</Link></div>
          <div><Link className="nice-button" to="/pantheons/54">Celtic</Link></div>
          <div><Link className="nice-button" to="/pantheons/55">Chaos Magick</Link></div>
          <div><Link className="nice-button" to="/pantheons/1">Egyptian</Link></div>
          <div><Link className="nice-button" to="/pantheons/6">Greek</Link></div>
          <div><Link className="nice-button" to="/pantheons/11">Gnosticism</Link></div>
          <div><Link className="nice-button" to="/pantheons/48">HOGD</Link></div>
          <div><Link className="nice-button" to="/pantheons/47">Hermeticism</Link></div>
          <div><Link className="nice-button" to="/pantheons/5">Wicca</Link></div>


          <h2>Classes & Categories</h2>
          <p>-See related Collections, Symbols, and Pantheons in one group</p>
          <div><Link className="nice-button" to="/categories">See more about Classes & Categories</Link></div>

          <h2>Future Features</h2>
          <p>Ideas I have planned for development:</p>
          <h5>Astrology Clock</h5>
          <p>See the current positions and influences of the planets, as well as search through time for events & birthdays.</p>
          <h5>{"Witches' Shelf & Spells"}</h5>
          <p>Save items to your personal inventory and favorite list, and see which spells you can do with the items.</p>
          <h5>Journals & Notes</h5>
          <p>Add your own private notes to publically edited pages. Edit and sort them in folders.</p>


          <h2>Help me make this project become a reality</h2>
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
