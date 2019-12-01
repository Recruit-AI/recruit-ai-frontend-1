import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
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
    this.sort(this.state.sort, this.state.sortdir * -1, newprops.item.symbols)
  }

  sort = (sort, sortdir, items) => {
    if (sort === this.state.sort) { sortdir = -1 * sortdir }
    console.log(items)
    if (sort === 'order_number') {
      items = items.sort((a, b) => Number.parseInt(a[sort]) > Number.parseInt(b[sort]) ? sortdir : -1 * sortdir)
    } else if (sort === 'symbol_name') {
      items = items.sort((a, b) => a[sort] > b[sort] ? sortdir : -1 * sortdir)
    } else {
      //If the sort term is in extra info
      if (items[0].extra_info[sort]) {
        items = items.sort((a, b) => {
          const firstValue = a.extra_info[sort] || ""
          const secondValue = b.extra_info[sort] || ""
          return firstValue > secondValue ? sortdir : -1 * sortdir
        })
      } //Or if it is a KIK object
      else {
        items = items.sort((a, b) => {
          let firstValue = a.connections.filter(connect => connect.kind_name === sort)[0]
          let secondValue = b.connections.filter(connect => connect.kind_name === sort)[0]
          firstValue = firstValue ? firstValue.symbol_name : ""
          secondValue = secondValue ? secondValue.symbol_name : ""
          return firstValue > secondValue ? sortdir : -1 * sortdir
        })

      }


    }

    this.setState({ sort, sortdir, items })
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

    return <div>
      <div className="divider" />
      <h2>Complete List of {item.kind_name} & their Correspondences</h2>
      <table className="extra-info-slider">
        <tr className="extra-info-row">
          {item.specific_order ?
            <td className={`extra-info-column ${this.state.sort === 'order_number' ? 'eic-active' : ''}`} onClick={this.sortNumber} >
              # {this.state.sort === 'order_number' ? (this.state.sortdir > 0 ? <i class="far fa-caret-square-up"></i> : <i class="far fa-caret-square-down"></i>) : ""}
            </td>
            : ""}

          <td className={`extra-info-column ${this.state.sort === 'symbol_name' ? 'eic-active' : ''}`} onClick={this.sortName} >
            Name {this.state.sort === 'symbol_name' ? (this.state.sortdir > 0 ? <i class="far fa-caret-square-up"></i> : <i class="far fa-caret-square-down"></i>) : ""}
          </td>

          {
            item.kindInfoKinds.map(infoKind =>
              <td className={`extra-info-column ${this.state.sort === infoKind.kind_name ? 'eic-active' : ''}`}
                onClick={this.sortOther} sortTerm={infoKind.kind_name} >
                {infoKind.kind_name} {this.state.sort === infoKind.kind_name ?
                  (this.state.sortdir > 0 ? <i class="far fa-caret-square-up"></i>
                    : <i class="far fa-caret-square-down"></i>) : ""}
              </td>
            )
          }

          {item.default_extra_info ? Object.entries(item.default_extra_info).map((entry) =>
            <td className={`extra-info-column ${this.state.sort === entry[0] ? 'eic-active' : ''}`} key={entry[0]} onClick={this.sortOther} sortTerm={entry[0]}>
              {/*Replaces underscores with spaces and capitalizes each word*/}
              {entry[0].replace(/_/g, ' ').replace(/(?: |\b)(\w)/g, function (key) { return key.toUpperCase() })}
              {this.state.sort === entry[0] ? (this.state.sortdir > 0 ? <i class="far fa-caret-square-up"></i> : <i class="far fa-caret-square-down"></i>) : ""}
            </td>) : ""}

          <td className="extra-info-column">Thumbnail</td>
        </tr>


        {
          item.symbols.map(symbol => <SymbolRow key={symbol.symbol_id} item={item} symbol={symbol} updatePage={this.props.updatePage} />)
        }

      </table>
    </div>
  }
}

export default BasicInfo
