import React from 'react'
import {Link} from 'react-router-dom'
import {Row, Col} from 'react-bootstrap'
const curr_user = localStorage.user ? JSON.parse(localStorage.user) : false


class BasicInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const item = this.props.item

    return <div>
    {item.thumbnail ? <img src={item.thumbnail.image_url} alt={item.kind_name} height="100px" /> : "" }
    <h1>{item.kind_name}</h1>

      { curr_user ?  <Link to={`/collections/${item.kind_id}/edit`}>Edit This Collection</Link> : "" }

      { curr_user ?  <Link to={`/symbols/new`}>New Symbol</Link> : "" }
    <Row>
        <Col lg={4}>
            <p>{item.kind_description || "Please fill in."}</p>
            <p>Created By: <Link to={`/pantheons/${item.pantheon_id}`}>{item.pantheon_name}</Link></p>

            { item.pantheons ?
              <p>Used By:
                {item.pantheons.map(i =>
                  <Link key={i.pantheon_id} to={`/pantheons/${i.pantheon_id}`}>{i.pantheon_name}</Link>
                )}</p>
              :""}
        </Col>
        <Col lg={8}>
            <h4>Theory & Application</h4>
            <p>{item.theoryText || "Please fill in."}</p>
            <h4>History & Background</h4>
            <p>{item.historyText || "Please fill in."}</p>
        </Col>
    </Row>
    </div>
  }
}

export default BasicInfo
