import React from 'react';

import Symbol from '../../../components/symbol/page/page'

class SymbolPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return <div  className="tpBlackBg">
        <Symbol match={this.props.match}  />
      </div>
  }
}

export default SymbolPage;
