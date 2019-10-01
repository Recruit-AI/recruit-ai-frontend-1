import React from 'react'
import {NavLink} from 'react-router-dom'

function Footer() {
    return <div className="footer">
        <div>
         ~ <NavLink to="/">Home</NavLink> ~
        <NavLink to="/symbols">Symbols</NavLink> ~
        <NavLink to="/pantheons">Pantheons</NavLink> ~
        <NavLink to="/collections">Collections</NavLink> ~
        <NavLink to="/categories">Categories</NavLink> ~
        </div>
        <img alt="logo" height="50px" src="https://www.freelogodesign.org/file/app/client/thumb/d61a2eaf-ba59-4c5c-b40b-5d866a55672e_200x200.png?1563814596359" />

        <h1>GRIMWIRE</h1>
    </div>
}

export default Footer;
