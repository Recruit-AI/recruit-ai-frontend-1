import React from 'react'
import {Link} from 'react-router-dom';
import {Row, Col} from 'reactstrap'


function SmallPantheonCard(props) {
    const item = props.pantheon

    return <Row>
      <Col>
            <h2>{ item.thumbnail ? <img src={item.thumbnail.image_url} height="50px" alt={item.pantheon_name} /> : item.pantheon_name[0]}</h2>
      </Col>
      <Col>
            <Link to={`/pantheons/${item.pantheon_id}`}>{ item.pantheon_name }</Link><br />
      </Col>
      <Col>
            <span style={{padding:'5px'}}>{item.start_year < 0 ? item.start_year*-1 + "BC" : item.start_year + "AD" }</span>
      </Col>
      <Col>
            <span style={{padding:'5px',color:'grey'}}>{item.pantheon_description}</span>
      </Col>
    </Row>
}

export default SmallPantheonCard
