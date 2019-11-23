import React from 'react';
import {Link} from 'react-router-dom'

import HandleForm from '../../../components/forms/handler'

import {defaultCategory} from '../../../db/defaultObjects'

class CategoryPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
  const curr_user = localStorage.user ?  JSON.parse(localStorage.user) : false
    return <div  className="tpBlackBg">
        { curr_user ?  <Link to="/categories">Back To All</Link> : ""}
        <HandleForm item={defaultCategory} formClass={"categories"} />
      </div>
  }
}

export default CategoryPage;
