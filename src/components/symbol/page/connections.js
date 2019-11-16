import React from 'react'
import {Link} from 'react-router-dom'
import {Row, Col} from 'react-bootstrap'
import FormInsert from '../../forms/handler'


function Display(props) {
  const item = props.item
  const number = props.number
  const title = props.title

  const conn = item.connections
    .filter(item => item.connection_relationship == number)
    .sort((a, b) => {
      const firstValue = a.kind_name || ""
      const secondValue = b.kind_name || ""
    return firstValue > secondValue ? 1 : -1
  })

  if(conn.length > 0) {
      let lastKind = "" 
      return <div>
        <h5>{title}</h5>
        {
          conn.map(i => {
            const showKind = i.kind_name !== lastKind
            lastKind = i.kind_name
            return <span>
              { showKind ? <b><br /><Link to={`/collections/${i.kind_id}`}>{lastKind}</Link><br /></b> : ""}

              <Link to={`/symbols/${i.symbol_id}`}><i>{i.symbol_name}</i></Link>

            </span> 
          })
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
        <Display item={props.item} number={"3"} title={"Attributes & Associations"} />
        <Display item={props.item} number={"1"} title={"Mentions, Stories, Teachings"} />
        <Display item={props.item} number={"0"} title={"Sources"} />
      </Col>
      <Col xs={12} lg={6} >
        <Display item={props.item} number={"6"} title={"Types"} />
        <Display item={props.item} number={"2"} title={"Related"} />
      </Col>
      <Col xs={12} lg={12} >
        <Display item={props.item} number={"7"} title={"Items"} />
      </Col>
  </Row>
}
