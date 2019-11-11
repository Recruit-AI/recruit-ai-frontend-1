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
        <img height="200px"  alt="logo" src={require('../../img/logo.png')} />
        <h1>GRIMWIRE</h1>
        <h2>A Magickal, Spritual, and Historical Encyclopedia,</h2>
        <h2>From Tarot Cards to Greek Myths to Buddhist Philosophy to Astrology</h2>
        <hr />
          {/*<div className="symbolBanner">{['om', 'ankh', 'yin-yang', 'quran', 'skull-crossbones', 'jedi', 'broom', 'dharmachakra', 'moon'].map((symbol) =>
            <h1 style={{display:'inline-block'}}className={`fas fa-${symbol}`}></h1>
          )}
        </div>*/}
        <Row className="CTAList">
          <Col lg={4} md={5} xs={12}><h2>Featuring</h2><h3>Symbols & Deities</h3><h3>Teachings & Concepts</h3><h3>Stories & Myths</h3><h3>Divination & Magic</h3></Col>
          <Col lg={4} md={4} xs={12}><h2>Including</h2><h3>Philosophies</h3><h3>Religions</h3><h3>Histories</h3><h3>Cultures & Beliefs</h3></Col>
          <Col lg={4} md={3} xs={12}><h2>For</h2><h3>Practitioners</h3><h3>Students</h3><h3>Teachers</h3><h3>Hobbyists</h3></Col>
        </Row>
        <hr />
        <br />

        <i>See what we have to offer.</i><br />
        <Link className="nice-button nice-button-primary" to="/pages/features">See Features <i className="fas fa-star"></i></Link>
        <h1></h1>
        <Link className="nice-button" to="/users/register">Sign Up for Mailing List</Link><br />
        <i>Be the first to get updates on future & official releases!</i>
        <hr />
        </div>
      </div>

      <div className="divider"></div>

      <div className="indexBar pageDarkSection">
        <h2>Welcome to GrimWire</h2>
        <hr />
      <Container>
      <Row>
        <Col lg={3} md={6} xs={12}>

          <Link to="/pantheons" className='homeImageLink-bg' style={{background:`url(${require('../../img/main-pantheon.jpg')})`,backgroundPosition:'center',backgroundSize:'cover'}} >
            <div className='homeImageLink'>
              <h3>All Pantheons</h3>
              <p>Religions, groups, organizations, and teachings throughout history. Complete histories & informations.</p>
            </div>
          </Link>

        </Col>
        <Col lg={3} md={6} xs={12}>
          <Link to="/collections" className='homeImageLink-bg' style={{background:`url(${require('../../img/main-collection.jpg')})`,backgroundPosition:'center',backgroundSize:'cover'}} >
            <div className='homeImageLink'>
              <h3>All Collections</h3>
              <p>Tarot Cards, Crystals, Astrological Signs, Angels, Demons, and the lists & collections that make up GrimWire.</p>
            </div>
          </Link>
        </Col>
        <Col lg={3} md={6} xs={12}>
          <Link to="/categories" className='homeImageLink-bg' style={{background:`url(${require('../../img/main-category.jpg')})`,backgroundPosition:'center',backgroundSize:'cover'}} >
            <div className='homeImageLink'>
              <h3>All Categories</h3>
              <p>Only looking for Wicca 101? Or the spellworking sections? Categories groups together collections for easier absorption.</p>
            </div>
          </Link>
        </Col>
        <Col lg={3} md={6} xs={12}>
          <Link to="/symbols" className='homeImageLink-bg' style={{background:`url(${require('../../img/main-symbol.jpg')})`,backgroundPosition:'center',backgroundSize:'cover'}} >
            <div className='homeImageLink'>
              <h3>Search Symbols</h3>
              <p>The whole list of symbols & objects, all the magickal things we have</p>
            </div>
          </Link>
        </Col>
      </Row>
      </Container>
      <hr />
    </div>


          <div className="reverse-divider"></div>


    </div>
  );
}

export default Home;
