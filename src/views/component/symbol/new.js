import React from 'react';
import axios from 'axios';

import Symbol from '../../../components/symbol/page/page'
import HandleForm from '../../../components/forms/handler'

import {defaultSymbol} from '../../../db/defaultObjects'

class SymbolPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return <div  className="tpBlackBg">
        <HandleForm item={defaultSymbol} formClass={"symbols"} />
      </div>
  }
}

export default SymbolPage;
