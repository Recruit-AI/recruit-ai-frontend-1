import React from 'react';
import axios from 'axios';

import Category from '../../../components/category/page/page'
import HandleForm from '../../../components/forms/handler'

import {defaultCategory} from '../../../db/defaultObjects'

class CategoryPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return <div  className="tpBlackBg">
        <HandleForm item={defaultCategory} formClass={"categories"} />
      </div>
  }
}

export default CategoryPage;
