import React from 'react'
import {Link} from 'react-router-dom'
import {Row, Col} from 'react-bootstrap'
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
    if(show) { this.props.updatePage() }
    document.querySelector('.extra-info-slider').scrollLeft= 0;
  }

  render() {
    const item = this.props.item
    const symbol = this.props.symbol
    return <div className="extra-info-row" key={symbol.symbol_id}>

    { !this.state.showForm ? <div>
        {item.specific_order ? <div className="extra-info-column">{symbol.order_number}. </div> : ""}

        <div className="extra-info-column"><Link to={`/symbols/${symbol.symbol_id}`}>{symbol.symbol_name}</Link></div>

        { symbol.extra_info ?
          Object.entries( item.default_extra_info ).map(
            (entry) =>
              <div className="extra-info-column" key={entry[0]}> {  symbol.extra_info[entry[0]] } </div>
          ) : ""}

        <div className="extra-info-column"><img alt={symbol.name} src={symbol.thumbnail ? symbol.thumbnail.image_url : ""} height="64px" /></div>


        <div className="extra-info-column"><button onClick={this.toggleForm}>{this.state.showForm ? "Done" : "Edit" }</button></div>
      </div> : "" }

      { this.state.showForm ? <div>
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
      </div> : "" }




    </div>
  }
}

export default BasicInfo
