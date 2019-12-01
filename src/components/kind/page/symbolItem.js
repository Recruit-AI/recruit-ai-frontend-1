import React from 'react'
import {Link} from 'react-router-dom'
import ImageModal from '../../imageGallery/imageModal'
import MainHandler from '../../forms/handler'

class BasicInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showForm: false
    }
  }

  toggleForm = (e) => {
    const show = this.state.showForm
    this.setState({showForm: !show})
    //if(show) { this.props.updatePage() }
    //document.querySelector('.extra-info-slider').scrollLeft= 0;
  }

  render() {
    const item = this.props.item
    const symbol = this.props.symbol
    return !this.state.showForm ? <tr className="extra-info-row" key={symbol.symbol_id}>

        {item.specific_order ? <td className="extra-info-column">{symbol.order_number}. </td> : ""}

        <td className="extra-info-column"><Link to={`/symbols/${symbol.symbol_id}`}>{symbol.symbol_name}</Link></td>

        {item.kindInfoKinds.map(infoKind => <td className="extra-info-column" key={infoKind.kind_name}> 
          {  
            symbol.connections.map(connection => connection.kind_name === infoKind.kind_name ? 
            <div><Link to={`/symbols/${connection.symbol_id}`}>{connection.symbol_name}</Link></div> : "" )
          } 
        </td>)}

        { symbol.extra_info ?
          Object.entries( item.default_extra_info ).map(
            (entry) =>
              <td className="extra-info-column" key={entry[0]}> {  symbol.extra_info[entry[0]] } </td>
          ) : ""}

        <td className="extra-info-column">
          <ImageModal item={symbol} size={'32px'} />
        </td>


        <td className="extra-info-column"><button onClick={this.toggleForm}>{this.state.showForm ? "Done" : "Edit" }</button></td>
      </tr> : <div>
        <div key={symbol.symbol_id} className="inlineForm">
          <MainHandler item={{
              order_number: symbol.order_number,
              symbol_name: symbol.symbol_name,
              symbol_kind_id: symbol.symbol_kind_id,
              extra_info: symbol.extra_info,
            }}
            editId={symbol.symbol_id} existing={true} formClass={"symbols"} update={this.toggleForm} />
          <button className="extra-info-column" onClick={this.toggleForm}>{this.state.showForm ? "Done" : "Edit" }</button>
        </div>
      </div> 
  }
}

export default BasicInfo
