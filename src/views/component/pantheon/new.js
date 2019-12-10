import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'

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

    const curr_user = localStorage.user ?  JSON.parse(localStorage.user) : false
    return <div  className="tpBlackBg">
          { curr_user ?  <Link to="/pantheons">Back To All</Link> : ""}
        <HandleForm item={defaultPantheon} formClass={"pantheons"} update={() => {}} />
      </div>
  }
}

export default PantheonPage;
