import React from 'react';
import axios from 'axios';

import Kind from '../../../components/kind/page/page'
import HandleForm from '../../../components/forms/handler'

import {defaultKind} from '../../../db/defaultObjects'

class KindPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return <div  className="tpBlackBg">
        <HandleForm item={defaultKind} formClass={"kinds"} />
      </div>
  }
}

export default KindPage;
