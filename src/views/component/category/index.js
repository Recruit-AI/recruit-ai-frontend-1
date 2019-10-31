import React from 'react';

import Categories from '../../../components/category/index/index'
import FormInsert from '../../../components/forms/handler'
import {defaultCategory} from '../../../db/defaultObjects'
import {Link} from 'react-router-dom'
import {CSSTransition, SwitchTransition} from 'react-transition-group'

class Category extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
    }
  }


  render() {
    const curr_user = localStorage.user ?  JSON.parse(localStorage.user) : false
  return (<SwitchTransition><CSSTransition key={`categories`}
    in={true} timeout={350} classNames="whole-page" unmountOnExit appear enter exit><div className="">
    <div key='categories' className="pageCTA">
        <div className="container">
          <h4>Our Collections compiled into convenient...</h4>
          <h1>Categories</h1>
          <h5>Our categories are an attempt at cataloging which collections are useful in which scenarios.</h5>
          <h3>We have categories for Philosophy 101, Introduction to Wicca, Mythology 101, and Divination, among others.</h3>
          <h6>Find your starting point below!</h6>

                        { curr_user ?  <Link to="/categories/new">+ Create New Category</Link> : "" }
        </div>
      </div>
      <div className="divider"></div>
      <div className="pageDarkSection">
      <Categories />
      </div>
      <div className="reverse-divider"></div>

            </div></CSSTransition></SwitchTransition>
  );

  }
}

export default Category;
