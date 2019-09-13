import React from 'react';

import Category from '../../../components/category/categoryPage.js'

class CategoryPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return <div className="tpBlackBg">
        <Category match={this.props.match} />
      </div>
  }
}

export default CategoryPage;
