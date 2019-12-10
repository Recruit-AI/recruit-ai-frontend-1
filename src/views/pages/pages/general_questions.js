import React from 'react'
import { Switch, Route } from 'react-router-dom'

import { CSSTransition, SwitchTransition } from 'react-transition-group'
import OurMission from './our_mission'

class Pages extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    questions = [
        {
            title: "Do you really believe in Magick, Witchcraft, etc.?",
            text: <p>I have a whole article on this, here. In short, the modern view among many practioners is that
            magick and science cannot conflict. There's still plenty we don't know about this Universe. That being said, we have
            a whole set of guidelines of where we draw the line regarding The Unknown Mysteries and The Ridiculous Woo-Woo. There's
            secrets to the human condition and the universe- and they're hidden inside you.</p>
        },
        {
            title: "Is it Satanic?",
            text: <p>Some people are, and we try not to discriminate on basis of religion. Typically, percentage-wise few people worship the Christian Devil or Evil Forces
            in that aspect. The great majority consider themselves "white" or "grey" witches- which can mean something
            different to each individual, but usually means "only help people", and "try to to only help, but don't mess
            with me", respectively. Even "black" witches usually seek some form of justice or morality- they just tend to
            be a "ends justify the means" sort of type.
            <br />Even Christian sects use witchcraft techniques sometimes. Catholics light candles and pray to saints.
            </p>
        },
        {
            title: "What makes your site different?",
            text: <p>I'm a web developer. This isn't just a forum, isn't just a blog, and isn't just a file organizer, like
            every other (magick) website out there. For the most part, they all have wonderful information, but I built a custom
            application that handles the information more effeciently, and more naturally, making it much easier to automagically sift through, organize, and sustain the large amount of information that is going to be here.</p>

        },
        {
            title: "What is this terminology?",
            text: <div>
                <h5>Pantheons</h5> i.e. Religions, cultures, pathss. The Google definition is: "All the gods of a people or religion collectively." Here, in general, really any group of people.<br />
                <h5>Collections</h5> can be "sets" of things- such as Tarot Cards, Astrology Signs, or Chakras;
                or "lists"- such as Dieties and Colors;
            and even "ideas"- such as entries for Concepts (Englightenment, God, Love) and Properties (Good Luck, Healing, Psychic Enhancement)<br />
                <h5>Symbols</h5> are the actual items in those collections.
            <h5>Categories</h5> are convienent groups for sorting through the Collections, like Wicca 101 or Advanced Tarot 251<br />
            </div>
        },
        {
            title: "What about these?",
            text: <div>
                <h5>[Human] Virtues</h5> Positive personality traits that you can work on & aim for, Wisdom, Love, Curiosity, etc.<br />
                <h5>[Magic] Properties</h5> Magic benefits, such as Cleansing, Wealth, Luck, and Protection<br />
                <h5>[Natural] Phenoms</h5> Naturally occuring "phenomena" or concepts- like the Weather, Life, Adventure, Mystery, Death, and War<br />
                <h5>[Mystic] Concepts</h5> Concepts that occur across religion and culture, but don't quite have a set or agreed upon "natural" definition to go by- like God, Enlightenment, The Soul, and Energy
            </div>
        },
        {
            title: "Teachings Sources People Stories?",
            text: <div>
            </div>
        },
        {
            title: "Source Connections vs Sources vs Resources?",
            text: <div>
            </div>
        },
        {
            title: "Rituals vs. Spells?",
            text: <div>
            </div>
        },
        {
            title: "Do you have a mobile app?",
            text: <div>
            <p>That is definitely something I'd love to do, but not at the moment. You can always create a bookmark on your desktop to the app, to give it a more native feel.</p>
    
            </div>
        },
        {
            title: "Why are you spelling magick like that that?",
            text: <div>
            <p>I wrote a whole article on this, here. Essentially, it's just convention, it doesn't really matter,
    but it helps tell the difference between real-life magick & witchcraft, Harry Potter, and Harry Houdini.</p>
            </div>
        },
        
    ]

    render() {
        return <SwitchTransition><CSSTransition key={`gq`}
            in={true} timeout={350} classNames="whole-page"
            unmountOnExit appear enter exit><div key="gq" style={{ minHeight: "100vh" }}>
                <h1>F.A.Q.</h1>
                <div className="faq-questions">

                   {this.questions.map(q => <div>
                       <h3>{q.title}</h3>
                       <div className="faq-answer">
                        {q.text}
                       </div>
                    </div>)}


                </div>

            </div></CSSTransition></SwitchTransition>

    }
}

export default Pages
