import React from 'react';
import axios from 'axios';

import Symbol from '../../../components/symbol/page/page'
import HandleForm from '../../../components/forms/handler'

import {defaultSymbolKeys, defaultSymbol} from  '../../../db/defaultObjects'

class SymbolPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        symbol: {}
    }
  }

  componentDidMount = () => { this.updateInfo(); }
  componentWillReceiveProps = (newProps) => {this.updateInfo(newProps);}

    updateInfo = (props = this.props) => {
      const id = props.match.params.id
      console.log(id)
      axios
          .get(`http://localhost:4001/api/symbols/${id}`)
          .then(res =>
            this.setState({symbol: res.data})
          )
          .catch(err => console.log(err) );
  }

  render() {
    const item = this.state.symbol
    const formFields = {}
    Object.keys(defaultSymbol).forEach((key) => {
    if(defaultSymbolKeys.includes(key)) {
      formFields[key] = item[key] ? item[key] : defaultSymbol[key]
    }});


    return <div  className="tpBlackBg">
        <HandleForm item={formFields} formClass={"symbols"} />
      </div>
  }
}

export default SymbolPage;
