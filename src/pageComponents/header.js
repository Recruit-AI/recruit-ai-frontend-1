import React from 'react'
import {NavLink} from 'react-router-dom'
import {Container, Row, Col, NavItem, Dropdown} from 'react-bootstrap'
import {withRouter} from 'react-router-dom'

function Menu(props) {
    const logout = (e) => {
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      props.history.push('/')
    }
    const user = localStorage.user ? JSON.parse(localStorage.user) : null
    return <div className="header">
        <Container>
            <Row>
                <Col xs={12} lg={2}>
                    <NavLink to="/"><img alt="logo" height="50px" src="https://www.freelogodesign.org/file/app/client/thumb/d61a2eaf-ba59-4c5c-b40b-5d866a55672e_200x200.png?1563814596359" /> GrimWire</NavLink>
                </Col>

                <Col xs={12} lg={10} className="menu-right">
                    {/*Content drop down*/}
                    <Dropdown as={NavItem}>
                      <Dropdown.Toggle as={NavLink}>Browse</Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item><NavLink to="/pantheons">By Pantheons & Religions</NavLink></Dropdown.Item>
                        <Dropdown.Item><NavLink to="/categories">By Categories & Classes</NavLink></Dropdown.Item>
                        <Dropdown.Item><NavLink to="/collections">By Lists & Collections</NavLink></Dropdown.Item>
                        <Dropdown.Item><NavLink to="/symbols">Search All</NavLink></Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>


                    <NavLink to="/pages/mission">Our Mission</NavLink>
                    <NavLink to="/pages/questions">FAQ</NavLink>
                    <NavLink to="/pages/help">Help Us Out</NavLink>
                    {
                       user ? <span>Welcome, Jordan <button onClick={logout}>Logout</button></span>
                      : <NavLink to="/users/login">Admin</NavLink>
                    }
                </Col>
            </Row>
        </Container>
    </div>
}

export default withRouter(Menu);
