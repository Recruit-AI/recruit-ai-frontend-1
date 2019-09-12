import React from 'react';
import { Container, Row, Col } from 'react-bootstrap'
import {Link} from 'react-router-dom'

import PopularPantheonList from '../../components/pantheon/lists/popular'
import Kinds from '../../components/kind/index/index'
import RandomSymbols from '../../components/symbol/index/index'



function Home(props) {
  return (
    <div>


      <div className="pageCTA">
        <div>
        <img height="200px"  alt="logo" src="https://www.freelogodesign.org/file/app/client/thumb/d61a2eaf-ba59-4c5c-b40b-5d866a55672e_200x200.png?1563814596359" />
        <h1>&nbsp;GRIMWIRE</h1>
        <h2>The Cultural, Spritual, and Historical Encyclopedia,</h2>
        <h2>From Tarot Cards to Greek Myths to Buddhist Philosophy to Astrology</h2>
        <hr />
        <Row className="CTAList">
          <Col><h2>Including</h2><h3>Philosophies</h3><h3>Religions</h3><h3>Histories</h3><h3>Cultures & Beliefs</h3></Col>
          <Col><h2>For</h2><h3>Practitioners</h3><h3>Students</h3><h3>Teachers</h3><h3>Hobbyists</h3></Col>
          <Col><h2>Featuring</h2><h3>Teachings & Concepts</h3><h3>Stories & Myths</h3><h3>Symbols & Dieties</h3><h3>Divination & Magic</h3></Col>
        </Row>
        </div>
      </div>

      <div className="divider"></div>

      <div className="indexBar">
      <Container>
      <Row>
        <Col>
          <img height="100px" src="https://image.flaticon.com/sprites/new_packs/112045-religion-symbols.png" />
          <h3><Link to='/pantheons'>All Pantheons</Link></h3>
          <p>Religions, groups, organizations, and teachings throughout history. Complete histories & informations.</p>
        </Col>
        <Col>
          <img height="100px" src="https://image.flaticon.com/sprites/new_packs/112045-religion-symbols.png" />
          <h3><Link to="/collections">All Collections</Link></h3>
          <p>Tarot Cards, Crystals, Astrological Signs, Angels, Demons, and the lists & collections that make up GrimWire.</p>
        </Col>
        <Col>
          <img height="100px" src="https://image.flaticon.com/sprites/new_packs/112045-religion-symbols.png" />
          <h3><Link to="/categories">All Categories</Link></h3>
          <p>Only looking for Wicca 101? Or the spellworking sections? Categories groups together collections for easier absorption.</p>
        </Col>
        <Col>
          <img height="100px" src="https://image.flaticon.com/sprites/new_packs/112045-religion-symbols.png" /><h3><Link to="/symbols">All Symbols</Link></h3>
          <p>The whole list of symbols & objects, all the magickal things we have</p>
        </Col>
      </Row>
      </Container>
    </div>


          <div className="reverse-divider"></div>

            <div className="tpBlackBg">
              <PopularPantheonList />
            </div>


    </div>
  );
}

export default Home;
