import React from 'react'
import {NavLink} from 'react-router-dom'
import {Container, Row, Col, NavItem, Dropdown} from 'react-bootstrap'
import {withRouter} from 'react-router-dom'


import {CSSTransition} from 'react-transition-group'

class Menu extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        showBrowseDropdown: false,
        showUserDropdown: false,
        showMenu: false
      }

            document.addEventListener('click', (e) => {
              const mobileToggleClick = e.target.className.indexOf('hmenu-mobile-toggle') >= 0
              const dropdownToggleClick = e.target.className.indexOf('hmenu-dropdown-toggle') >= 0
              if(!dropdownToggleClick && !mobileToggleClick) {
                this.setState({showBrowseDropdown: false, showUserDropdown: false, showMenu: false})
              }
            })
    }

    logout = (e) => {
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      this.props.history.push('/')
    }

    toggleMenu = (e) => {
      this.setState({showMenu: !this.state.showMenu})
    }

    toggleBrowseDropdown = (e) => {
      this.setState({showUserDropdown: false, showBrowseDropdown: !this.state.showBrowseDropdown})
    }

    toggleUserDropdown = (e) => {
      this.setState({showBrowseDropdown: false, showUserDropdown: !this.state.showUserDropdown})
    }


    render = () => {

    const user = localStorage.user ? JSON.parse(localStorage.user) : null

    const showBrowse = this.state.showBrowseDropdown
    const showUser = this.state.showUserDropdown

    return <div className={`${this.state.showBrowseDropdown || this.state.showUserDropdown ? 'headerFill' : ""} header `}>

      <Container>
        <Row>
            <Col xs={12} lg={3} style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <NavLink to="/"><img alt="logo" height="50px" src={require('../img/logo.png')} /> GrimWire</NavLink>
                <span className='fas fa-bars hmenu-mobile-toggle d-inline d-lg-none' onClick={this.toggleMenu}></span>
            </Col>

            <Col xs={12} lg={9} className='menu-right' >
              <div className={`${ this.state.showMenu ? "mobile-menu-show" : "mobile-menu-hide" }`}>

                <span className="hmenu-item hmenu-dropdown">
                  <span className="hmenu-dropdown-toggle" onClick={this.toggleBrowseDropdown}>
                    Browse
                  </span>
                  <br />
                  <CSSTransition in={showBrowse} timeout={100} classNames="menu-fade">
                  <span className="hmenu-dropdown-options" style={{display: showBrowse ? 'block' : 'none'}}>
                    <NavLink to="/pantheons">By Pantheons & Religions</NavLink>
                    <NavLink to="/categories">By Categories & Classes</NavLink>
                    <NavLink to="/collections">By Lists & Collections</NavLink>
                    <NavLink to="/symbols">Search All</NavLink>
                  </span>
                  </CSSTransition>
                </span>


                <NavLink className="hmenu-item" to="/pages/mission">Our Mission</NavLink>
                <NavLink className="hmenu-item" to="/pages/questions">FAQ</NavLink>
                <NavLink className="hmenu-item" to="/pages/help">Help Us Out</NavLink>

                {
                  user ?

                <span className="hmenu-item hmenu-dropdown">
                  <span className="hmenu-dropdown-toggle" onClick={this.toggleUserDropdown}>
                    Account
                  </span>
                  <br />
                  <CSSTransition in={showUser} timeout={100} classNames="menu-fade">
                   <span className="hmenu-dropdown-options" style={{display: (showUser ? 'block' : 'none')}}>
                     <NavLink to="/users/profile">Dashboard</NavLink>
                     <NavLink to={`/users/${user.user_id}`}>View My Profile</NavLink>
                     <NavLink to="/admin/users">(#) User List</NavLink>
                     <NavLink to="/admin/logs">(#) Logs</NavLink>
                     <NavLink to="/feedback">(#) Feedback</NavLink>
                     <span className="hmenu-item" onClick={this.logout} style={{cursor:'pointer'}}>Log Out <i class="fas fa-sign-out-alt"></i></span>
                   </span>
                 </CSSTransition>
               </span>

                 :

                 <span className="hmenu-item hmenu-dropdown">
                   <span className="hmenu-dropdown-toggle" onClick={this.toggleUserDropdown}>
                     Account
                   </span>
                   <br />
                   <CSSTransition in={showUser} timeout={100} classNames="menu-fade">
                    <span className="hmenu-dropdown-options" style={{display: (showUser ? 'block' : 'none')}}>
                        <NavLink className="hmenu-item" to="/users/register">Sign Up</NavLink>
                        <NavLink className="hmenu-item" to="/users/login">Sign In</NavLink>
                        <NavLink className="hmenu-item" to="/users/forgottenPassword">Forgot My Password</NavLink>
                    </span>
                  </CSSTransition>
                </span>
                }


                <NavLink className="hmenu-item" to="/feedback/provide">Feedback/Report</NavLink>

                </div>
            </Col>
        </Row>

    </Container>

    </div>
  }

}

export default withRouter(Menu);
//
