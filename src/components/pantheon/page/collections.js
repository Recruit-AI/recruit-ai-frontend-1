import React from 'react'
import {Link} from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'


class Collections extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const {created_kinds, uses_kinds} = this.props.item
    return <Row>
                          <Col>
                            <h5>Collections Created by {this.props.item.pantheon_name}</h5>
                            {
                              created_kinds.length > 0 ?
                              created_kinds.map(item => <Link key={item.kind_name} to={`/collection/${item.kind_id}`}>
                                  {item.kind_name}
                                </Link>
                              ) : "N/a" 
                            }
                          </Col>
                          <Col>
                            <h5>Collections Used by {this.props.item.pantheon_name}</h5>
                            {
                              uses_kinds.length > 0 ?
                              uses_kinds.map(item => <Link  key={item.kind_name} to={`/collection/${item.kind_id}`}>{item.kind_name}</Link> ) : "N/a"
                            }
                          </Col>
                      </Row>
  }
}

export default Collections
