import React from 'react'
import {NavLink} from 'react-router-dom'
import {Container, Row, Col, NavItem, Dropdown} from 'react-bootstrap'
import {withRouter} from 'react-router-dom'



class Menu extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        showDropdown: false,
        showMenu: false
      }
      document.addEventListener('click', (e) => {
        if(e.target.className.indexOf('hmenu-dropdown-toggle') < 0 && e.target.className.indexOf('hmenu-mobile-toggle') < 0){
          this.setState({showDropdown: false, showMenu: false})
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

    toggleDropdown = (e) => {
      this.setState({showDropdown: !this.state.showDropdown})
    }


    render = () => {

    const user = localStorage.user ? JSON.parse(localStorage.user) : null


    return <div className="header">

      <Container>
        <Row>
            <Col xs={12} lg={2} style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <NavLink to="/"><img alt="logo" height="50px" src={require('../img/logo.png')} /> GrimWire</NavLink>
                <span className='hmenu-mobile-toggle d-inline d-lg-none' onClick={this.toggleMenu}>{ this.state.showMenu ? 'Menu x' : 'Menu o' }</span>
            </Col>

            <Col xs={12} lg={10} className='menu-right' >
              <div className={`${ this.state.showMenu ? "mobile-menu-show" : "mobile-menu-hide" }`}>
                <span className="hmenu-item hmenu-dropdown">
                  {/*Content drop down*/}
                  <span className="hmenu-dropdown-toggle" onClick={this.toggleDropdown}>
                    Browse
                  </span>
                  <br />
                  <span className="hmenu-dropdown-options" style={{display: this.state.showDropdown ? 'block' : 'none'}}>
                    <NavLink to="/pantheons">By Pantheons & Religions</NavLink>
                    <NavLink to="/categories">By Categories & Classes</NavLink>
                    <NavLink to="/collections">By Lists & Collections</NavLink>
                    <NavLink to="/symbols">Search All</NavLink>
                  </span>
                </span>


                <NavLink className="hmenu-item" to="/pages/mission">Our Mission</NavLink>
                <NavLink className="hmenu-item" to="/pages/questions">FAQ</NavLink>
                <NavLink className="hmenu-item" to="/pages/help">Help Us Out</NavLink>
                {
                   user ? <span className="hmenu-item"><button onClick={this.logout}>Logout</button></span>
                  : <NavLink className="hmenu-item" to="/users/login">Admin</NavLink>
                }
                </div>
            </Col>
        </Row>

    </Container>

    </div>
  }

}

export default withRouter(Menu);
//
//
