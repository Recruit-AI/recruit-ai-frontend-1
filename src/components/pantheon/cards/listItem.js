import React from 'react'
import { Link } from 'react-router-dom';
import { Row, Col } from 'reactstrap'


function SmallPantheonCard(props) {
      const item = props.pantheon

      return <Link to={`/pantheons/${item.pantheon_id}`} className='blockLink'><Row>
            <Col lg={4} xs={12}>
                  <h2>{item.thumbnail ? <img src={item.thumbnail.image_url ? item.thumbnail.image_url : require('../../../img/logo.png')} height="50px" alt={item.pantheon_name} /> : item.pantheon_name[0]}</h2>
            </Col>
            <Col lg={4} xs={12}>
                  <h5>{item.pantheon_name}</h5>
            </Col>
            <Col lg={4} xs={12}>
                  <span style={{ padding: '5px' }}>{item.start_year < 0 ? item.start_year * -1 + "BC" : item.start_year + "AD"} - {item.end_year < 0 ? item.end_year * -1 + "BC" : (item.end_year === 2100 ? "Present" : item.end_year + "AD") }</span>
            </Col>
            <Col xs={12}>
                  <br />
                  <span style={{ padding: '10px' }}>{item.pantheon_description}</span>
            </Col>
      </Row></Link>
}

export default SmallPantheonCard
