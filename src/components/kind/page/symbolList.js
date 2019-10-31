import React from 'react'
import {Link} from 'react-router-dom'
import {Row, Col} from 'react-bootstrap'
import MainHandler from '../../forms/handler'
import SymbolRow from './symbolItem'

class BasicInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sort: '',
      sortdir: -1,
      items: []
    }
  }

  componentDidMount = () => {
    this.sort(this.props.item.specific_order ? "order_number" : "symbol_name", 1, this.props.item.symbols)
  }

  componentWillReceiveProps = (newprops) => {
    this.sort(this.state.sort, this.state.sortdir*-1, newprops.item.symbols )
  }

  sort = (sort, sortdir, items) => {
    if(sort === this.state.sort) { sortdir = -1*sortdir }
    console.log(items)
    if(sort === 'order_number'){
      items = items.sort((a, b) => Number.parseInt(a[sort]) > Number.parseInt(b[sort]) ? sortdir : -1*sortdir )
    }else if(sort === 'symbol_name'){
      items = items.sort((a, b) => a[sort] > b[sort] ? sortdir : -1*sortdir )
    }else {
      items = items.sort((a, b) => {
        const firstValue = a.extra_info[sort] || ""
        const secondValue = b.extra_info[sort] || ""
        return firstValue > secondValue ? sortdir : -1*sortdir
      })
    }

    this.setState({sort, sortdir, items})
  }

  sortOther = (e) => {
    const sort = e.target.attributes.sortTerm.value
    this.sort(sort, this.state.sortdir, this.state.items)
  }

  sortName = (e) => {
    this.sort('symbol_name', this.state.sortdir, this.state.items)
  }

  sortNumber = (e) => {
    this.sort('order_number', this.state.sortdir, this.state.items)
  }

  render() {
    const item = this.props.item
    return <div className="extra-info-slider">

    <h3>List of Items ></h3>

    <div className="extra-info-row">
        {item.specific_order ?
          <div className={`extra-info-column ${ this.state.sort === 'order_number' ? 'eic-active' : ''}`} onClick={this.sortNumber} >
            # {  this.state.sort === 'order_number' ? (this.state.sortdir > 0 ? <i class="far fa-caret-square-up"></i> :<i class="far fa-caret-square-down"></i>) : "" }
          </div>
        : ""}

        <div className={`extra-info-column ${ this.state.sort === 'symbol_name' ? 'eic-active' : ''}`} onClick={this.sortName} >
          Name {  this.state.sort === 'symbol_name' ? (this.state.sortdir > 0 ? <i class="far fa-caret-square-up"></i> : <i class="far fa-caret-square-down"></i>) : "" }
        </div>

        { item.default_extra_info ? Object.entries( item.default_extra_info ).map( (entry) =>
          <div className={`extra-info-column ${ this.state.sort === entry[0] ? 'eic-active' : ''}`} key={entry[0]} onClick={this.sortOther} sortTerm={entry[0]}>
            {/*Replaces underscores with spaces and capitalizes each word*/}
            {entry[0].replace(/_/g, ' ').replace(/(?: |\b)(\w)/g, function(key) { return key.toUpperCase()})}
            {  this.state.sort === entry[0] ? (this.state.sortdir > 0 ? "/\\" : '\\/') : "" }
          </div> ) : "" }

        <div className="extra-info-column">Thumbnail</div>
    </div>


    {
      item.symbols.map(symbol => <SymbolRow key={symbol.symbol_id} item={item} symbol={symbol} updatePage={this.props.updatePage} />)
    }


    </div>
  }
}

export default BasicInfo
