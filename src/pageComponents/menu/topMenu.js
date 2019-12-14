import React from 'react'
import menuStructure from './structure'
import MenuItem from './menuItem'
import { withRouter } from 'react-router-dom'

import axios from 'axios'
import {apiPath} from '../../helpers/api'

import { CSSTransition } from 'react-transition-group'

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      site_pages: []
    }
  }

  componentDidMount = async () => {
    const pages = await axios.get(apiPath('/pages'))
    this.setState({site_pages: pages.data})
  }

  sitePagesCategories = ['Features', 'About']

  sitePagesStructure = () => {
    let returnStructure = []
    this.sitePagesCategories.map(category => {
      let categoryDropdown = {name: category, view: 'all', symbol: ""}
      let dropdownOptions = []
      this.state.site_pages.map(page => {
        if(page.page_category === category) {
          dropdownOptions.push({name: page.page_title, view: "all", link: `pages/${page.page_title}`, symbol: ""})
        }
      })
      categoryDropdown.links = dropdownOptions
      returnStructure.push(categoryDropdown)
    })
    return returnStructure

  }

  render = () => {
    return <div className={`${this.props.showMenu ? "mobile-menu-show" : "mobile-menu-hide"}`}>
      {[...this.sitePagesStructure(), ...menuStructure, ].map(item => 
        <MenuItem auth={this.props.auth} item={item} toggleDropdown={this.props.toggleDropdown} />        
      ) } 
    </div>
  }
}

export default withRouter(Menu);
