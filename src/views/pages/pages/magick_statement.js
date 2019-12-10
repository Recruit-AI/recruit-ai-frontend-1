import React from 'react'
import { CSSTransition, SwitchTransition } from 'react-transition-group'

class Pages extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        return <SwitchTransition><CSSTransition key={`help`}
            in={true} timeout={350} classNames="whole-page" unmountOnExit appear enter exit>
            <div key="help" className="faq-questions" style={{ minHeight: "100vh" }}>

                <div className="divider" />
                <h1>Site Rules</h1>
                <div className="reverse-divider" />

                <h3>1. No bashing/belittling</h3>
                <div className="faq-answer">
                    <p>This is a space for everyone- from beginner to advance. Information may be incomplete and questions may be asked. Be nice and help out, explain things like you didn't know anything.</p>
                </div>
                <h3>2. No hate or discrimination</h3>
                <div className="faq-answer">
                    <p>Be aware of which groups of people are currently targeted for unfair discrimination. Including, but not limited to, racist, sexist, homophobic, and transphobic slurs, prejuidices, and objectification.</p>
                </div>
                <h3>3. No trolling or spam</h3>
                <div className="faq-answer">
                    <p>Content used soly to provoke reactions or promote themselves will be moderated. We welcome some degree of promotion when sourced/resourced through the right means.</p>
                </div>
                <h3>4. No off-topic, biased, or unsourced content</h3>
                <div className="faq-answer">
                    <p>We are not particulary dismissing such ideas. We already have plenty of other information to organize and want to keep to the topic of Magick, Witchcraft, and Spirituality. </p>
                    <p>No consipracies, UFOs, or politically or religiously-biased content.</p>
                    <p>No Strict Urban Legends- such as the Loch Ness Monster, Bigfoot, etc.</p>
                    <p>We have discussed adding "Haunted Places" and "Serial Killers", but for now, these topics will not be accepted.</p>
                </div>

                <div className="divider" />
                <h1>Axioms of Magick, Witchcraft, & Spirituality (MWS)</h1>
                <hr />
                <div className="faq-answer">
                    <p>This is NOT an attempt to lay out "Rules" or "Theory" of Magick, but are common terms and basic definitions
                    used in this sites' context which govern the perspective & quality of content on this website. </p>
                    <p>I.e. We don't want to tell you what to do, but we also don't want hack/cheap/fake content.</p>
                </div>
                <div className="reverse-divider" />

                <h3>Summary of Axioms:</h3>
                <div className="faq-answer">
                    <p>1. These aren't hard rules, but you must understand why they're here.</p>
                    <p>2. Coexist with science, you can't break the laws of nature, reality, or physics (but you should try bending them)</p>
                    <p>3. Labels are a personal choice, and there's no hard rules to any labels, be open-minded.</p>
                    <p>4. All humans possess "the divine spark". There is (should be) nothing elitest about magic, witchcraft, or spirituality. You do not *need* any person or group to find your vibe. There are no "true" teachings.</p>
                    <p>5. There may not be quanitifiable/definable proof or repeatable/exact steps, but there are loose rules & structures for those who take the time to get to know them.</p>
                    <p>6. Just, like, in general; don't be a jerk.</p>
                </div>

                <h3>1. Axiom of Infinite Possibility</h3>
                <div className="faq-answer">
                    <p>a) There are infinite possibilites to what may be possible</p>
                    <p>b) But not EVERYTHING is possible</p>
                </div>

                <h3>2. Axiom of Nature, Physics, & Reality (NPR)</h3>
                <div className="faq-answer">
                    <p>a) Magick & Science coexist, you cannot use Magick, Witchcraft, or Spirituality to contradict the laws of Nature, Physics, or Reality.</p>
                    <p>b) This includes immortality, pschokinesis, time travel, and a few others.</p>
                </div>

                <h3>3. Axiom of Personal Labeling</h3>
                <div className="faq-answer">
                    <p>a) Only you have the power to put labels on yourself, for your own sake. Do not force labels on a group of people.</p>
                    <p>b) Labels can be interpreted by each individual; a Buddhist/Christian or Christian-Wiccan or even a Christian-atheist can exist.</p>
                    <p>c) Saying a label does not mean you inherently ascribe to all views of that label</p>
                    <p>c.i) But you should still accept responsibility for using terms that carry a negative societal impact***</p>
                </div>

                <h3>4. Axiom of Natural Human Holiness</h3>
                <div className="faq-answer">
                    <p>a) There are no 'damned' groups of people, humanity is not naturally dirty, sinful, or in need of salvation.</p>
                    <p>b) Each person is able to access Divinity/MWS on their own, without *need* for a particular system or any system at all</p>
                    <p>c) Also included under this is "no grandoise claims"- being the "next" or "real" Jesus/Lucifer/etc.</p>
                </div>

                <h3>5. Axiom of Fluid Science: Documentation & Repeatablity</h3>
                <div className="faq-answer">
                    <p>a) There is obviously no true, repeatable, definable proof- you cannot break the laws of reality.</p>
                    <p>b) There is no steps you *must* take- if you're finding yourself asking, "will it stll work if..." the chances, are yes. Just ask your intuition.</p>
                    <p>c) Maybe we'll have the terminiology and devices to measure one day, but for now personal/collective experience & documentation is the main argument***.</p>
                </div>

                <h3>6. Axiom of Not Being A Jerk</h3>
                <div className="faq-answer">
                    <p>a) There are some groups & beliefs that include dehumanizing other groups. We don't support that stuff and won't be a platform for unchallenged hate.</p>
                </div>

                <h3>Clarifications</h3>
                <div className="faq-answer">
                    <p>***Axiom 3.c.i; 3.c should be used to allow an individual freedom to choose a label
                        without agreeing to -everything- that -everyone- has ever said about that label. It should not be
                        used to justify/excuse the historical/current actions of hate groups.
                </p>
                    <p>***Axiom 6.a This of course, given that the bolder the claim, the more proof required. Ex. If you say,
                        "My personal experience is that practicing x provides y and z benefits to myself, and in no way affects any others",
                        that is suffienct 'evidence' to continue your practice. That is substantially different then,
                        "My personal belief is that gay marriage is a sin, and I want to 'help' others",
                    which does not justify taking any legal or otherwise control over people's actions whatsoever.</p>
                </div>

            </div>
        </CSSTransition></SwitchTransition >

    }
}

export default Pages
