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
            { item.health_warning ? <h3 className="health-warning">WARNING: {item.health_warning}</h3> : ""}
            <p>{item.kind_description || "Please fill in."}</p>

            
            <h4>Pantheons</h4>
            <p>Created: <Link to={`/pantheons/${item.pantheon_id}`}>{item.pantheon_name}</Link></p>

            { item.pantheons ?
              <p>Uses:
                {item.pantheons.map(i =>

                  <Link key={i.pantheon_id} to={`/pantheons/${i.pantheon_id}`}>{console.log(i)}{i.pantheon_name}</Link>
                )}</p>
              :""}

            <h4>Classes & Categories</h4>
            {item.categories.map(category => <div>
              <Link to={`/categories/${category.category_id}`}>{category.category_name} {category.category_number}</Link>
            </div>)}

        </Col>
        <Col lg={8}>
            <h4>Theory & Application</h4>
            <p>{item.kind_application_theory_text || "Please fill in."}</p>
            <h4>History & Background</h4>
            <p>{item.kind_background_history_text || "Please fill in."}</p>
        </Col>
    </Row>
    </div>
  }
}

export default BasicInfo
