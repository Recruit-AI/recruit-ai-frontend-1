import React from 'react'
import {Link} from 'react-router-dom'
import {Row, Col} from 'react-bootstrap'

class BasicInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const item = this.props.item
    return <div>
    <h3>List of Items</h3>

    <Row>
        {item.specific_order ? <Col>#</Col> : ""}
        <Col>Name</Col>
        { item.default_extra_info ? Object.entries( item.default_extra_info ).map( (entry) => <Col key={entry[0]}> {entry[0]} </Col> ) : "" }
        <Col>Thumbnail</Col>
    </Row>


    {item.symbols.map(i => <Row key={i.symbol_name}>
        {item.specific_order ? <Col>{i.order_number}. </Col> : ""}
        <Col><Link to={`/symbols/${i.symbol_id}`}>{i.symbol_name}</Link></Col>
        { console.log(i) }
        { i.extra_info ?
          Object.entries( item.default_extra_info ).map(
            (entry) =>
              <Col key={entry[0]}> {  i.extra_info[entry[0]] } </Col>
          ) : ""}
        <Col><img alt={i.name} src={i.thumbnail ? i.thumbnail.image_url : ""} height="64px" /></Col>
    </Row>)}
    </div>
  }
}

export default BasicInfo
