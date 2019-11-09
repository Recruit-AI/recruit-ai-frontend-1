import React from 'react'
import menuStructure from './structure'
import MenuItem from './menuItem'
import { withRouter } from 'react-router-dom'


import { CSSTransition } from 'react-transition-group'

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }


  render = () => {
    return <div className={`${this.props.showMenu ? "mobile-menu-show" : "mobile-menu-hide"}`}>
      {menuStructure.map(item => 
        <MenuItem item={item} toggleDropdown={this.props.toggleDropdown} />        
      ) }
    </div>
  }
}

export default withRouter(Menu);
