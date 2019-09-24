import React from 'react'
import {NavLink} from 'react-router-dom'
import {Container, Row, Col} from 'react-bootstrap'

function Menu() {
    return <div className="header">
        <Container>
            <Row>
                <Col xs={12} lg={2}>
                    <NavLink to="/"><img alt="logo" height="50px" src="https://www.freelogodesign.org/file/app/client/thumb/d61a2eaf-ba59-4c5c-b40b-5d866a55672e_200x200.png?1563814596359" /> GrimWire</NavLink>
                </Col>

                <Col xs={12} lg={10} className="menu-right">
                    {/*Content drop down*/}
                    <NavLink to="/pantheons">Pantheons & Religions</NavLink>
                    <NavLink to="/categories">Categories & Classes</NavLink>
                    <NavLink to="/collections">Lists & Collections</NavLink>
                    <NavLink to="/symbols">Search</NavLink>

                    <NavLink to="/categories">Our Mission</NavLink>
                    {
                      true ? <span>
                        <NavLink to="/users/login">Login</NavLink>
                        <NavLink to="/users/register">Register</NavLink>
                      </span>
                      :
                        <NavLink to="/users/profile">Welcome, Jordan</NavLink>

                    }
                </Col>
            </Row>
        </Container>
    </div>
}

export default Menu;
