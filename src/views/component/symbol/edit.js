import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'

import Symbol from '../../../components/symbol/page/page'
import HandleForm from '../../../components/forms/handler'
import RelationshipForm from '../../../components/forms/relationship'

import {defaultSymbolKeys, defaultSymbol} from  '../../../db/defaultObjects'

class SymbolPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        symbol: {},
        page: 0
    }
  }

  componentDidMount = () => { this.updateInfo(); }
  componentWillReceiveProps = (newProps) => {this.updateInfo(newProps);}

    updateInfo = (props = this.props) => {
      const id = props.match.params.id
      console.log(id)
      axios
          .get(`https://grimwire.herokuapp.com/api/symbols/${id}`)
          .then(res =>
            this.setState({symbol: res.data})
          )
          .catch(err => console.log(err) );
  }

  changePage = (e) => {
    this.setState({page: Number.parseInt(e.target.getAttribute('data-page'))})
  }


  render() {
    const item = this.state.symbol
    const formFields = {}
    Object.keys(defaultSymbol).forEach((key) => {
    if(defaultSymbolKeys.includes(key)) {
      formFields[key] = item[key] ? item[key] : defaultSymbol[key]
    }});


        const page = this.state.page
        const pages = ["Main", "Thumbnail Image", "Image Gallery", "Connections", "Pantheons", "Sources"]

    return <div>

        <Link to={`/symbols/${item.symbol_id}`}>Back to Page</Link>

        <h3>{item.symbol_name}</h3>

          <div>
                    {
                      pages.map(option =>
                        <span className={`page-button ${pages.indexOf(option) == page ? "page-button-active" : ""}`} onClick={this.changePage} data-page={pages.indexOf(option)}>
                          {option}
                        </span>)

                    }
          </div>

          {
          page === 0 ?

        <HandleForm item={formFields} formClass={"symbols"} update={this.updateInfo} />
        : ""
    }
    {
      page === 1 ?


        <RelationshipForm item={item} formClass={"thumbnail"} update={this.updateInfo} info={ {id: item.symbol_id, class: "Symbol"}  } />
        : ""
    }
    {
      page === 2 ?

        <RelationshipForm item={item} formClass={"images"} update={this.updateInfo} info={ {id: item.symbol_id, class: "Symbol"}  } />
        : ""
    }
    {
      page === 3 ?


        <RelationshipForm item={item} formClass={"symbol_connections"} update={() => {return true}} />
        : ""
    }
    {
      page === 4 ?

        <RelationshipForm item={item} formClass={"symbol_pantheons"} update={this.updateInfo} />
        : ""
    }
    {
      page === 5 ?
        <RelationshipForm item={item} formClass={"sources"} update={this.updateInfo}  info={ {id: item.symbol_id, class: "Symbol"}  } />
        : ""
    }
      </div>
  }
}

export default SymbolPage;
