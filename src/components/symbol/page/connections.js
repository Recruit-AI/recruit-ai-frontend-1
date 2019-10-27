import React from 'react'
import {Link} from 'react-router-dom'
import {Row, Col} from 'react-bootstrap'
import FormInsert from '../../forms/handler'


function Display(props) {
  const item = props.item
  const number = props.number
  const title = props.title

  const conn = item.connections.filter(item => item.connection_relationship == number)

  if(conn.length > 0) {
      return <div>
        <h5>{title}</h5>
        {
          conn.map(i => <div>
            <Link to={`/symbols/${i.symbol_id}`}>{i.symbol_name} ({i.kind_name})</Link>
          </div>)
        }
      </div>
  } else {
    return ""
  }
}

export default function Connections(props){
  return <Row>
      <Col xs={12} lg={6} >
        <Display item={props.item} number={"5"} title={"Alternate Names & Titles"} />
        <Display item={props.item} number={"4"} title={"Properties"} />
        <Display item={props.item} number={"2"} title={"Related"} />
        <Display item={props.item} number={"1"} title={"Mentions, Stories, Teachings"} />
        <Display item={props.item} number={"0"} title={"Sources"} />
      </Col>
      <Col xs={12} lg={6} >
        <Display item={props.item} number={"3"} title={"Attributes & Associations"} />
      </Col>
  </Row>
}
