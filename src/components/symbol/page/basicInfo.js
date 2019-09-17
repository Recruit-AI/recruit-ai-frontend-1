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
      <img src={item.thumbnail ? `http://localhost:4001/uploads/${item.thumbnail.image_url}` : ""}  alt={item.pantheon_name} width="100px"/>
      <h1>{item.order_number ? item.order_number + ". " : ''} {item.symbol_name}</h1>

      <Row>
          <Col lg={8}>
              <h4>Basic Information</h4>
            <p>Short Description: {item.symbol_description}</p>
              <i>{ item.other_spellings ? `Also Spelled: ${ item.other_spellings }` : "" } </i>
              <p>Collection: <Link to={ `/collections/${item.kind.kind_id}` }> {item.kind.kind_name} </Link></p>
              { item.pantheons.length > 0 ?
                <p>Used by: { item.pantheons.map(i => <Link key={i.id} to={`/pantheon/${i.pantheon_id}`}> {i.pantheon_name} </Link>) }</p>
                : "" }
          </Col>
          <Col lg={4}>
              <h4>Key Information</h4>
              {  item.extra_info ?
                Object.entries(item.kind.default_extra_info).map(infoEntry =>
                  <div key={infoEntry[0]} >
                    {infoEntry[0]}: {item.extra_info[infoEntry[0]] }
                  </div> ) : ""  }
          </Col>
      </Row>


    </div>
  }
}

export default BasicInfo
