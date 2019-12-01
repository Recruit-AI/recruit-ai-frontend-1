import React from 'react';

import Symbol from '../../../components/symbol/page/page'
import {CSSTransition, SwitchTransition} from 'react-transition-group'

class SymbolPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return <SwitchTransition><CSSTransition key={`symbols-show`}
      in={true} timeout={350} classNames="whole-page" unmountOnExit appear enter exit><div  key={`symbols-show`}>
        <Symbol match={this.props.match}  />
      </div></CSSTransition></SwitchTransition>
  }
}

export default SymbolPage;
