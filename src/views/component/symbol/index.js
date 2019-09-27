import React from 'react';

import Symbols from '../../../components/symbol/index/index'
import FormInsert from '../../../components/forms/handler'
import {defaultSymbol} from '../../../db/defaultObjects'

class Symbol extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      showSymbolForm: false
    }
  }


  toggleSymbolForm = () => {
    this.setState({showSymbolForm: !this.state.showSymbolForm})
  }

  render() {
  return (
    <div className="">
      <div className="pageCTA">
        <div className="container">
          <h4>Search through our database of topics & objects</h4>
          <h1>Symbols</h1>
          <h5>In one way or another, everything is a symbol, everything has meaning</h5>
          <h3>Our "Symbols" include the items that make up all of our Collections list.</h3>

        </div>
      </div>
      <div className="divider"></div>
      <div className="pageDarkSection">
      <Symbols />
      </div>
      <div className="reverse-divider"></div>

    </div>
  );

  }
}

export default Symbol;
