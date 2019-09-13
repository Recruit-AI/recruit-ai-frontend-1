import React from 'react';
import axios from 'axios';

import Pantheon from '../../../components/pantheon/page/page'
import HandleForm from '../../../components/forms/handler'

import {defaultPantheon} from '../../../db/defaultObjects'

class PantheonPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return <div  className="tpBlackBg">
        <HandleForm item={defaultPantheon} formClass={"pantheons"} />
      </div>
  }
}

export default PantheonPage;
