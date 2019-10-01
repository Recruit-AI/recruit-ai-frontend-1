import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'

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
  const curr_user = localStorage.user ?  JSON.parse(localStorage.user) : false
    return <div  className="tpBlackBg">
        { curr_user ?  <Link to="/collections">Back To All</Link>: "" }
        <HandleForm item={defaultKind} formClass={"kinds"} />
      </div>
  }
}

export default KindPage;
