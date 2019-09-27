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
    return <div>
    <h3>List of Items</h3>

    <Row>
        {item.specific_order ? <Col onClick={this.sortNumber} >#</Col> : ""}
        <Col onClick={this.sortName} >Name</Col>
        { item.default_extra_info ? Object.entries( item.default_extra_info ).map( (entry) =>
          <Col key={entry[0]} onClick={this.sortOther} sortTerm={entry[0]}> {entry[0]} </Col> ) : "" }
        <Col>Thumbnail</Col>
    </Row>


    {item.symbols.map(i => <Row key={i.symbol_name}>
        {item.specific_order ? <Col>{i.order_number}. </Col> : ""}
        <Col><Link to={`/symbols/${i.symbol_id}`}>{i.symbol_name}</Link></Col>
        { i.extra_info ?
          Object.entries( item.default_extra_info ).map(
            (entry) =>
              <Col key={entry[0]}> {  i.extra_info[entry[0]] } </Col>
          ) : ""}
        <Col><img alt={i.name} src={i.thumbnail ? i.thumbnail.image_url : ""} height="64px" /></Col>
    </Row>)}
    </div>
  }
}

export default BasicInfo
