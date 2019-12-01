import React from 'react'
import {Link} from 'react-router-dom'

class BasicInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }



  render() {
    const {item} = this.props

    return <div>
            <h3>History</h3>
            { item.history.length > 0 ? item.history.map(i => <span key={i.pantheon_name}>
                <Link to={`/pantheons/${i.pantheon_id}`}>{i.pantheon_name}</Link>
            </span>) : "N/a" }<br />

            <h3>Offshoots</h3>
            { item.influenced.length > 0 ? item.influenced.map(i => <span key={i.pantheon_name}>
                <Link to={`/pantheons/${i.pantheon_id}`}>{i.pantheon_name}</Link>
            </span>) : "N/a"}<br />
    </div>
  }
}

export default BasicInfo
