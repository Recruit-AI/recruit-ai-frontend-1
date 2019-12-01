import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'

import TextOutput from '../../shared/textOutput';

const curr_user = localStorage.user ? JSON.parse(localStorage.user) : false


class BasicInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const item = this.props.item

    return <div>



      <div className="divider" />
    
    
      <div className="text-container">
      {item.thumbnail ? <img src={item.thumbnail.image_url} alt={item.kind_name} height="100px" /> : ""}
      <h1>{item.kind_name}</h1>
      {item.health_warning ? <h3 className="health-warning">WARNING: {item.health_warning}</h3> : ""}

      <p>{item.kind_description || "Please fill in."}</p>
      </div>
      <div className="reverse-divider" />

      <div className="text-container">
        <h3>Created</h3>
        <Link to={`/pantheons/${item.pantheon_id}`}>{item.pantheon_name}</Link>

        {item.pantheons ? <div>
          <h3>Uses</h3>
          {item.pantheons.map(i =>
            <Link key={i.pantheon_id} to={`/pantheons/${i.pantheon_id}`}>{console.log(i)}{i.pantheon_name}</Link>
          )}
        </div> : ""}

        <h3>Classes & Categories</h3>
        {item.categories.map(category => <div>
          <Link to={`/categories/${category.category_id}`}>{category.category_name} {category.category_number}</Link>
        </div>)}

      </div>

      {this.props.children}

      <TextOutput text={item.kind_application_theory_text} title={'Theory & Application'} />
      <TextOutput text={item.kind_background_history_text} title={'History & Overview'} />

    </div>
  }
}

export default BasicInfo
