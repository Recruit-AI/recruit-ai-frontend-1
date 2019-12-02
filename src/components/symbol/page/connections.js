import React from 'react'
import {Link} from 'react-router-dom'
import {Row, Col} from 'react-bootstrap'


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
      return <div className="symbol-connection-area"><div className="reverse-divider" />
        <h3>{title}</h3>
        <div className="divider" />
        {
          conn.map(i => {
            const showKind = i.kind_name !== lastKind
            lastKind = i.kind_name
            return <span>
              { showKind ? <h4><Link to={`/collections/${i.kind_id}`}>{lastKind}</Link></h4> : ""}

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
  return <div><Row className="connection-row">
      <Col xs={12} lg={6} >
        <Display item={props.item} number={"5"} title={"Alternate Names & Titles"} />
        <Display item={props.item} number={"4"} title={"Properties & Values"} />
        <Display item={props.item} number={"3"} title={"Attributes & Associations"} />
        <Display item={props.item} number={"1"} title={"Mentions, Stories, Teachings"} />
        <Display item={props.item} number={"0"} title={"Sources"} />
      </Col>
      <Col xs={12} lg={6} >
        <Display item={props.item} number={"6"} title={"Types"} />
        <Display item={props.item} number={"2"} title={"Related Items"} />
      </Col>
      <Col xs={12} lg={12} >
        <Display item={props.item} number={"7"} title={"Items"} />
      </Col> 
  </Row></div>
}
