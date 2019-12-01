import React from 'react'
import {Row, Col} from 'react-bootstrap'
import {Link} from 'react-router-dom'

class BasicInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  
  yearRange = (item) => {
    if(item.start_year && item.end_year) {
    var start_yearString = item.start_year > 0 ? item.start_year + "AD" : item.start_year * -1 + "BC"
    var end_yearString = item.end_year > 0 ?
        item.end_year === 2100 ? "Present" : item.end_year + "AD" :
        item.end_year * -1 + "BC"
    return start_yearString + " - " + end_yearString;
  } else {
    return ""
  }
}

  render() {
    const item = this.props.item
    return <div>
      <Row>
          <Col xs='12'>
              <img src={item.thumbnail ? item.thumbnail.image_url : require('../../../img/logo.png')}  alt={item.pantheon_name} width="100px"/>
              <h1>{item.pantheon_name}</h1>
              <p>{ this.yearRange(item) }</p>
              <p>{item.pantheon_description || "Please fill in."}</p>
              {this.props.children}
          </Col>
      </Row>


    </div>
  }
}

export default BasicInfo
