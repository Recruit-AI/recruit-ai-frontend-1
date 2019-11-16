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
        <h3>1. What is this terminology?</h3>
        <h5>Pantheons</h5> Google definition: "All the gods of a people or religion collectively." Here, in general, any groups, religions, or cultures<br />
        <h5>Collections</h5> can be "sets" of things- such as Tarot Cards, Astrology Signs, or Chakras;
        or "lists"- such as Dieties and Colors;
        and even "concepts"- such as entries for English Word Meanings and Teachings<br />
        <h5>Categories</h5> are convienent groups for sorting through the Collections<br />
        <h5>Symbols</h5> are the items in the collections.

        <h3>2. What about these?</h3>
        <h5>[Human] Virtues</h5> Positive personality traits that you can work on & aim for, Wisdom, Love, Curiosity, etc.<br />
        <h5>[Magic] Properties</h5> Magic benefits, such as Cleansing, Wealth, Luck, and Protection<br />
        <h5>[Natural] Phenoms</h5> Naturally occuring "phenomena" or concepts- like the Weather, Life, Adventure, Mystery, Death, and War<br />
        <h5>[Mystic] Concepts</h5> Concepts that occur across religion and culture, but don't quite have a set or agreed upon "natural" definition to go by- like God, Enlightenment, The Soul, and Energy

        Teachings Sources People Stories

        Deities Rituals Spells MagicItems

        <h3>3. Do you have a mobile app?</h3>
        <p>That is definitely something I'd love to do, but not at the moment. You can always create a bookmark on your desktop to the app, to give it a more native feel.</p>

        </div></CSSTransition></SwitchTransition>

    }
}

export default Pages
