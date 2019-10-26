import React from 'react'
import {Link} from 'react-router-dom'
import {Row, Col} from 'react-bootstrap'

class BasicInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sort: this.props.item.specific_order ? "order_number" : "symbol_name",
      items: this.props.item.symbols
    }
  }


  sortOther = (e) => {
    const sort = e.target.attributes.sortTerm.value
    if(sort === this.state.sort) {
      this.setState({items: this.state.items.reverse()})
    } else {
      this.setState({
        items: this.state.items.sort((a, b) => (a.extra_info[sort] > b.extra_info[sort]) ? 1 : -1),
        sort: sort })
    }
  }

  sortName = (e) => {
    const sort = "symbol_name"
    if(sort === this.state.sort) {
      this.setState({items: this.state.items.reverse()})
    } else {
      this.setState({
        items: this.state.items.sort((a, b) => (a[sort] > b[sort]) ? 1 : -1),
        sort: sort })
    }
  }

  sortNumber = (e) => {
    const sort = "order_number"
    if(sort === this.state.sort) {
      this.setState({items: this.state.items.reverse()})
    } else {
      this.setState({
        items: this.state.items.sort((a, b) => (a[sort] > b[sort]) ? 1 : -1),
        sort: sort })
    }
  }

  render() {
    const item = this.props.item
    return <div className="extra-info-slider">

    <h3>List of Items ></h3>

    <div className="extra-info-row">
        {item.specific_order ? <div className="extra-info-column" onClick={this.sortNumber} >#</div> : ""}
        <div className="extra-info-column" onClick={this.sortName} >Name</div>
        { item.default_extra_info ? Object.entries( item.default_extra_info ).map( (entry) =>
          <div className="extra-info-column" key={entry[0]} onClick={this.sortOther} sortTerm={entry[0]}>
            {/*Replaces underscores with spaces and capitalizes each word*/}
            {entry[0].replace(/_/g, ' ').replace(/(?: |\b)(\w)/g, function(key) { return key.toUpperCase()})}
          </div> ) : "" }
        <div className="extra-info-column">Thumbnail</div>
    </div>


    {item.symbols.map(i => <div className="extra-info-row" key={i.symbol_name}>
        {item.specific_order ? <div className="extra-info-column">{i.order_number}. </div> : ""}
        <div className="extra-info-column"><Link to={`/symbols/${i.symbol_id}`}>{i.symbol_name}</Link></div>
        { i.extra_info ?
          Object.entries( item.default_extra_info ).map(
            (entry) =>
              <div className="extra-info-column" key={entry[0]}> {  i.extra_info[entry[0]] } </div>
          ) : ""}
        <div className="extra-info-column"><img alt={i.name} src={i.thumbnail ? i.thumbnail.image_url : ""} height="64px" /></div>
    </div>)}
    </div>
  }
}

export default BasicInfo
