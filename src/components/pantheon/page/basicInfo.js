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
          <Col>
              <img src={item.thumbnail ? `http://localhost:4001/uploads/${item.thumbnail.image_url}` : ""}  alt={item.pantheon_name} width="100px"/>
              <h1>{item.pantheon_name}</h1>
              <p>{item.pantheon_description}</p>
              {this.props.children}
          </Col>
          <Col>
              <h4>Overview</h4>
              <p>{item.pantheon_overview_text}</p>
          </Col>
      </Row>


    </div>
  }
}

export default BasicInfo
