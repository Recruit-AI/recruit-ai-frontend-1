import React from 'react'
import {Link} from 'react-router-dom'

class BasicInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const item = this.props.item

    return <div>
      <img src={item.thumbnail ? item.thumbnail.image_url : ""}  alt={item.pantheon_name} width="100px"/>
      <h1>{item.order_number ? item.order_number + ". " : ''} {item.symbol_name}</h1>


            <p>{item.symbol_description || "Please fill in."}</p>
              <p><Link to={ `/collections/${item.kind.kind_id}` }> Part of a list of {item.kind.kind_name} </Link></p>
            { item.health_warning ? <h3 className="health-warning">WARNING: {item.health_warning}</h3> : ""}
            
            {item.kindSymbolConnection.length > 0 ? 
                <h4>Related Lists</h4> : ""}

              { 
              item.kindSymbolConnection.map(ksc => <span>
                 <Link to={`/collections/${ksc.kind_id}`}>{ksc.kind_name}</Link>
              </span>) 
              }


              <i>{ item.other_spellings ? `Also Spelled: ${ item.other_spellings }` : "" } </i>
              { item.pantheons.length > 0 ?
                <p>Used by: { item.pantheons.map(i => <Link key={i.id} to={`/pantheons/${i.pantheon_id}`}> {i.pantheon_name} </Link>) }</p>
                : "" }

              {  item.extra_info && Object.entries(item.extra_info).length > 0 ? <div>
              <h4>Key Information</h4>
                { Object.entries(item.kind.default_extra_info).map(infoEntry =>
                  <div key={infoEntry[0]} >
                    {infoEntry[0].replace(/_/g, ' ').replace(/(?: |\b)(\w)/g, function(key) { return key.toUpperCase()})}: {item.extra_info[infoEntry[0]] }
                  </div> )  } </div>: ""  }



    </div>
  }
}

export default BasicInfo
