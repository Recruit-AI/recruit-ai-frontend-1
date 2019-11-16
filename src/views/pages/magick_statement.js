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
          in={true} timeout={350} classNames="whole-page" unmountOnExit appear enter exit>
            <div key="help" style={{minHeight:"100vh"}}>
                <h1>Site Rules</h1>
                <h3>1. No bashing/belittling</h3>
                <p>This is a space for everyone- from beginner to advance. Information may be incomplete and questions may be asked. Be nice and help out, explain things like you didn't know anything.</p>
                <h3>2. No hate or discrimination</h3>
                <p>Be aware of which groups of people are currently targeted for unfair discrimination. Including, but not limited to, racist, sexist, homophobic, and transphobic slurs, prejuidices, and objectification.</p>
                <h3>3. No trolling or spam</h3>
                <p>Content used soly to provoke reactions or promote themselves will be moderated. We welcome some degree of promotion when sourced/resourced through the right means.</p>
                <h3>4. No off-topic, biased, or unsourced content</h3>
                <p>We are not particulary dismissing such ideas. We already have plenty of other information to organize and want to keep to the topic of Magick, Witchcraft, and Spirituality. </p>
                <p>No consipracies, UFOs, or politically or religiously-biased content.</p>
                <p>No Strict Urban Legends- such as the Loch Ness Monster, Bigfoot, etc.</p>
                <p>We have discussed adding "Haunted Places" and "Serial Killers", but for now, these topics will be accepted.</p>
                    

                <h1>Axioms of Magick, Witchcraft, & Spirituality (MWS)</h1>
                <p>These are common terms and basic definitions which govern the perspective & quality of content on this website.</p>

                <h2>Summary of Axioms:</h2>
                <h4>1. You can of course try to exceed these axioms, but we recommend you first understand why they are here.</h4>
                <h4>2. Coexist with science, you can't break the laws of nature, reality, or physics (but you should try bending them)</h4>
                <h4>3. Labels are a personal choice, and there's no hard rules to any labels, be open-minded.</h4>
                <h4>4. All humans possess "the divine spark". There is (should be) nothing elitest about magic, witchcraft, or spirituality. You do not *need* any person or group to find your vibe.</h4>
                <h4>5. There may not be quanitifiable/definable proof, but there are rules & structures for those who take the time to get to know them. </h4>
                <h4>6. Just, like, in general; don't be a jerk.</h4>

                <h2>1. Axiom of Infinite Possibility</h2>
                <p>a) There are infinite possibilites to what may be possible</p>
                <p>b) But an infinite set is not required to include *all* possiblities (ex. There are infinite even numbers, but not one odd number among them)</p>
                <p>c) Summary: A lot of things may be possible, but for discussion & </p>

                <h2>2. Axiom of Nature, Physics, & Reality (NPR)</h2>
                <p>Magic, Science, and Witchcraft coexist.</p>
                <p>You cannot use MWS to contradict the laws of NPR</p>

                <h2>3. Axiom of Personal Labeling</h2>
                <p>a) Only you have the power to ascribe labels to yourself, for your own sake. Do not force labels on a group of people.</p>
                <p>b) Labels can be interpreted by each individual; a Buddhist/Christian or Christian-Wiccan or even a Christian-atheist can exist.</p>
                <p>c) Saying a label does not mean you inherently ascribe to all views of that label</p>
                <p>c.i) But you should still accept responsibility for using terms that carry a negative societal impact***</p>

                <h2>4. Axiom of Natural Human Holiness</h2>
                <p>a) There are no 'damned' groups of people, there is no </p>
                <p>aa) humanity is not dirty, sinful, or </p>
                <p>b) Each person is able to access Divinity/MWS on their own, without *need* for a particular system or any system at all</p>
                
                <h2>5. Axiom of Science: Documentation & Repeatablity</h2>
                <p>a) </p>
                <p>b) </p>
                <p>c) Maybe we'll have the terminiology and devices to measure one day, but for now personal/collective experience & documentation is the main argument***.</p>
                
                <h2>6. Axiom of Not Being A Jerk</h2>
                <p>a) There are some groups & beliefs that include dehumanizing </p>

                <h2>Clarifications</h2>
                <p>***Axiom 3.c.i; 3.c should be used to allow an individual freedom to choose a label 
                    without agreeing to -everything- that -everyone- has ever said about that label. It should not be
                    used to 
                </p>
                <p>***Axiom 6.c This of course, given that the bolder the claim, the more proof required. Ex. If you say, 
                    "My personal experience is that practicing x provides y and z benefits to myself, and in no way affects any others", 
                    that is suffienct 'evidence' to continue your practice. That is substantially different then, 
                    "My personal belief is that gay marriage is a sin, and I want to 'help' others", 
                    which does not justify taking any legal or otherwise control over people's actions whatsoever.</p>


            </div>
        </CSSTransition></SwitchTransition>

    }
}

export default Pages
