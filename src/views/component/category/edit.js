import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'

import Category from '../../../components/category/page/page'
import HandleForm from '../../../components/forms/handler'
import RelationshipForm from '../../../components/forms/relationship'

import {defaultCategoryKeys, defaultCategory} from  '../../../db/defaultObjects'

class CategoryPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        category: {},
        page: 0
    }
  }

  componentDidMount = () => { this.updateInfo(); }
  componentWillReceiveProps = (newProps) => {this.updateInfo(newProps);}

    updateInfo = (props = this.props) => {
      const id = props.match.params.id
      console.log(id)
      axios
          .get(`https://grimwire.herokuapp.com/api/categories/${id}`)
          .then(res =>
            this.setState({category: res.data})
          )
          .catch(err => console.log(err) );
  }
  changePage = (e) => {
    this.setState({page: Number.parseInt(e.target.getAttribute('data-page'))})
  }


  render() {
    const item = this.state.category
    const formFields = {}
    Object.keys(defaultCategory).forEach((key) => {
    if(defaultCategoryKeys.includes(key)) {
      formFields[key] = item[key] ? item[key] : defaultCategory[key]
    }});

        const page = this.state.page
        const pages = ["Main", "Thumbnail Image", "Image Gallery", "Kinds", "Pantheons", "Symbols", "Prerequisites", "Sources"]
    return <div  className="tpBlackBg">

        <Link to={`/categories/${item.category_id}`}>Back to Page</Link>

          <div>
                    {
                      pages.map(option =>
                        <span className={`page-button ${pages.indexOf(option) == page ? "page-button-active" : ""}`} onClick={this.changePage} data-page={pages.indexOf(option)}>
                          {option}
                        </span>)

                    }
          </div>


          {
          page === 0 ?

        <HandleForm item={formFields} formClass={"categories"} update={this.updateInfo}  />
        : ""
    }
    {
      page === 1 ?


        <RelationshipForm item={item} formClass={"thumbnail"} update={this.updateInfo} info={ {id: item.category_id, class: "Category"}  } />
        : ""
    }
    {
      page === 2 ?

        <RelationshipForm item={item} formClass={"images"} update={this.updateInfo} info={ {id: item.category_id, class: "Category"}  } />
        : ""
    }
    {
      page === 3 ?


        <RelationshipForm item={item} formClass={"kinds_in_categories"} update={this.updateInfo} />
        : ""
    }
    {
      page === 4 ?


        <RelationshipForm item={item} formClass={"category_pantheons"} update={this.updateInfo} />
        : ""
    }
    {
      page === 5 ?


        <RelationshipForm item={item} formClass={"category_symbols"} update={this.updateInfo} />
        : ""
    }
    {
      page === 6 ?

        <RelationshipForm item={item} formClass={"category_prereqs"} update={this.updateInfo} />
        : ""
    }
    {
      page === 7 ?
        <RelationshipForm item={item} formClass={"sources"} update={this.updateInfo}  info={ {id: item.category_id, class: "Category"}  } />
        : ""
    }


      </div>
  }
}

export default CategoryPage;
