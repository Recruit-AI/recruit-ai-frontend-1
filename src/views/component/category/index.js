import React from 'react';

import Categories from '../../../components/category/index/index'
import FormInsert from '../../../components/forms/handler'
import {defaultCategory} from '../../../db/defaultObjects'

class Category extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
    }
  }


  render() {
  return (
    <div className="">
      <div className="pageCTA">
        <div className="container">
          <h4>List of all relgions, groups, and philosophies</h4>
          <h1>Categories</h1>
          <h5>All human thought is related to another. The Greeks came from the Macedonians, the Jewish people
            from the Ancient Babylonians, The Christians from both of those, and all three inspired many other forms of thought.</h5>
          <h3>All forms of thought & philosophy around the state & nature of humanity, the universe, and anything beyond can be better
            understood by looking at the forms of thought that inspired those civiliations</h3>
          <h6>We attempt to include all forms of schools and tribes but that will take time and effort. You can help us.</h6>

        </div>
      </div>
      <div className="divider"></div>
      <div className="pageDarkSection">
      <Categories />
      </div>
      <div className="reverse-divider"></div>

    </div>
  );

  }
}

export default Category;
