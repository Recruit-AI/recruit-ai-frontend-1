import React from 'react';

import Kind from '../../../components/kind/page/page'

class KindPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return <div className="tpBlackBg">
        <Kind match={this.props.match}  />
      </div>
  }
}

export default KindPage;
