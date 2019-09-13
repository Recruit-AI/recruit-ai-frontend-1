import React from 'react'
import {Link} from 'react-router-dom'

class BasicInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }


      yearRange = (item) => {
          if(item.startYear && item.endYear) {
          var startYearString = item.startYear > 0 ? item.startYear + "AD" : item.startYear * -1 + "BC"
          var endYearString = item.endYear > 0 ?
              item.endYear === 2100 ? "Present" : item.endYear + "AD" :
              item.endYear * -1 + "BC"
          return startYearString + " - " + endYearString;
        } else {
          return ""
        }
      }

  render() {
    const {item} = this.props

    return <div>
            <p> { this.yearRange(item) } </p>
            History:
            { item.history.length > 0 ? item.history.map(i => <span key={i.pantheon_name}>
                <Link to={`/pantheons/${i.pantheon_id}`}>{i.pantheon_name}</Link>
            </span>) : "N/a" }<br />

            Offshoots:
            { item.influenced.length > 0 ? item.influenced.map(i => <span key={i.pantheon_name}>
                <Link to={`/pantheons/${i.pantheon_id}`}>{i.pantheon_name}</Link>
            </span>) : "N/a"}<br />
    </div>
  }
}

export default BasicInfo
