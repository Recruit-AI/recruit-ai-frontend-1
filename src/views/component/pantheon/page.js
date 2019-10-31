import React from 'react';

import Pantheon from '../../../components/pantheon/page/page'
import {CSSTransition, SwitchTransition} from 'react-transition-group'

class PantheonPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return <div className="tpBlackBg">
        <Pantheon match={this.props.match}  />

      </div>
  }
}

export default PantheonPage;
