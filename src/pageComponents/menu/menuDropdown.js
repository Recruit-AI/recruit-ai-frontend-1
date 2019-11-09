import React from 'react'
import MenuItem  from './menuItem'
import { withRouter } from 'react-router-dom'


import { CSSTransition } from 'react-transition-group'

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false
    }

    document.addEventListener('click', (e) => {
      const mobileToggleClick = e.target.className.indexOf('hmenu-mobile-toggle') >= 0
      const dropdownToggleClick = e.target.className.indexOf(`hdt-${this.props.item.name}`) >= 0
      if (!dropdownToggleClick && !mobileToggleClick) {
        this.setState({ showMenu: false })
      }
    })
  }

  toggleMenu = (e) => {
    this.setState({ showMenu: !this.state.showMenu })
    this.props.toggleDropdown(!this.state.showMenu)
  }

  render = () => {
    const showMenu = this.state.showMenu
    const item = this.props.item
    const user = localStorage.user ? JSON.parse(localStorage.user) : null

    return <span className="hmenu-item hmenu-dropdown">
      <div className={`hmenu-dropdown-toggle hdt-${item.name}`} onClick={this.toggleMenu}>
        <span className={`hmenu-dropdown-toggle hdt-${this.props.item.name} fas fa-${item.symbol} `}></span> 
        {item.name} 
        <span className={`hmenu-dropdown-toggle hdt-${this.props.item.name} fas fa-caret-${this.state.showMenu ? 'down' : 'up'} `}></span>
      </div>
      <br />
      <CSSTransition in={showMenu} timeout={100} classNames="menu-fade">
        <div className="hmenu-dropdown-options" style={{ display: (showMenu ? 'block' : 'none') }}>
          {item.links.map(subitem => 
          <MenuItem item={subitem} />        
          )}
        </div>
      </CSSTransition>
    </span>


  }
}

export default withRouter(Menu);
