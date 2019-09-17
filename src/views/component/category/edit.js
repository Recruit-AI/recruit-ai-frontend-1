import React from 'react';
import axios from 'axios';

import Category from '../../../components/category/page/page'
import HandleForm from '../../../components/forms/handler'

import {defaultCategoryKeys, defaultCategory} from  '../../../db/defaultObjects'

class CategoryPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        category: {}
    }
  }

  componentDidMount = () => { this.updateInfo(); }
  componentWillReceiveProps = (newProps) => {this.updateInfo(newProps);}

    updateInfo = (props = this.props) => {
      const id = props.match.params.id
      console.log(id)
      axios
          .get(`http://localhost:4001/api/categories/${id}`)
          .then(res =>
            this.setState({category: res.data})
          )
          .catch(err => console.log(err) );
  }

  render() {
    const item = this.state.category
    const formFields = {}
    Object.keys(defaultCategory).forEach((key) => {
    if(defaultCategoryKeys.includes(key)) {
      formFields[key] = item[key] ? item[key] : defaultCategory[key]
    }});

    return <div  className="tpBlackBg">
        <HandleForm item={formFields} formClass={"categories"} />
      </div>
  }
}

export default CategoryPage;
