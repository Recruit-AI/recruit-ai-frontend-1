import React from 'react'
import {Row, Col} from 'react-bootstrap'
import {Link} from 'react-router-dom'

class BasicInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const item = this.props.item
    return <div>
      <Row>
          <Col xs='12'>
              <img src={item.thumbnail ? item.thumbnail.image_url : require('../../../img/logo.png')}  alt={item.pantheon_name} width="100px"/>
              <h1>{item.pantheon_name}</h1>
              <p>{item.pantheon_description || "Please fill in."}</p>
              {this.props.children}
          </Col>
          <Col xs='12'>
              <h4>Overview</h4>
              <p>{item.pantheon_overview_text || "Please fill in."}</p>
          </Col>
      </Row>


    </div>
  }
}

export default BasicInfo
