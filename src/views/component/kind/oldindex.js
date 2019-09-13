import React from 'react';

import {Row, Col, Accordion, Button, Card} from 'react-bootstrap'

import Kinds from '../../../components/kind/index/index'
import Collections from '../../../components/category/categoriesComponent'
import FormInsert from '../../../components/forms/handler'
import {defaultKind} from '../../../db/defaultObjects'

class Kind extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      showKindForm: false
    }
  }


  toggleKindForm = () => {
    this.setState({showKindForm: !this.state.showKindForm})
  }

  render() {
  return (
    <div className="">
        <div className="pageCTA">
          <div className="container">
            <div>
              <h5>What are...</h5>
              <h1>Collections</h1>
              <h5>...?</h5>
              <h4>There are 7 chakras, 9 planets, 12 astrology signs, 78 tarot cards, and limitless amount of dieties.</h4>
              <h3>Each of these groups have things they share, that they don't with the others.</h3>
              <h5>And...</h5>
              <h5>What if you want to know the lore surrounding certain crystals? Or the properties of herbs? Or </h5>
              <h2>Our Collections act as Tags for types of...</h2>
              <h3>well...</h3>
              <h2>Things.</h2>
            </div>
          </div>
        </div>

        <div className="divider"></div>

        <div className="indexBar">
          <Collections />
        </div>

        <div className="reverse-divider"></div>

        <div className="pageDarkSection">
          <Kinds />
        </div>

        <div className="divider"></div>

      <div className="tpBlackBg">
          <h2>F.A.Q.</h2>

            <Accordion>
              <Card>
                <Card.Header>
                  <Accordion.Toggle as={Button} variant="link" eventKey="0">
                    <h3>What's the difference between "Teaching" vs. "Story" vs. "Scripture" vs. "Source" vs. "Concept"</h3>
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body><h4>In an effort to categorize, we came up with and use this terminology:</h4>
                  <h5>Teachings</h5><p>things that are explicity from a Teacher or Philosopher to a group/another, ex. Buddha, Plato </p>
                  <h5>Concept</h5><p>a thing/idea/word that many people have talked about, ex. Enlightenment, God </p>
                  <h5>Story</h5><p>A fable or myth that was used & understood to be a metaphor of how the world worked, ex. Greek Myths </p>
                  <h5>Scripture</h5><p>text that has several layers, not completely just a Teaching, and not simply a Story, and usualy claimed as Divine, ex. Old Testament & Vedic Texts.</p>
                  <h5>Source</h5><p>Any book or media that provides information.</p>
                  <p><b>There can be several entries regarding the "same" item.</b></p>
                  <p>Example, "New Testament" is the name of the "Source" article, and has information about the historical findings of the actual texts.</p>
                  <p>"The Testament of Matthew", and John, etc. can be "Scripture" articles, and have information about what those say and how they differ, their plots, and interpretations.</p>
                  <p>Certain speeches that Jesus was quoted as giving, i.e. "The Sermon on The Mount" can have it's own "Teaching" page.</p>
                  <p>Similarly, "Jesus" can be the "Person" page, featuring information about the person, while "Christ", "Baptism", and "Holy Spirit" have a "Concept" page.</p>
                  <p>The power of this App is how it all links everything together, each page is linked to the necessary ones.</p>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card>
                <Card.Header>
                  <Accordion.Toggle as={Button} variant="link" eventKey="1">
                    <h3>"Property" vs. "Phenom" vs. "Value" ?</h3>
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="1">
                  <Card.Body><h5>Property</h5><p>i.e. Effects, If something can be said to carry "good luck", "healing", ex. herbs and crystals</p>
                  <h5>Phenom</h5><p>i.e. 'Things' that happen or exist, Weather, harvest, death, art, sickness; ex. A diety that is The God of "The Oceans"</p>
                  <h5>Value</h5><p>i.e. Qualities, morals, Courage, wisdom, creativity, compassion</p>

                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>





        </div>


        <div className="reverse-divider"></div>


        <FormInsert item={defaultKind} formClass={"kinds"} />

    </div>
  );

  }
}

export default Kind;
