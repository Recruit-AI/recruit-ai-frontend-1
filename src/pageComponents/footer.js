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
        We Use Google Analytics- <a href="https://www.google.com/policies/privacy/partners/">How Google uses data when you use our app.</a><br />
      <NavLink to="/pages/privacy-policy">Our Privacy Policy</NavLink><br />
        <img alt="logo" height="50px" src="https://www.freelogodesign.org/file/app/client/thumb/d61a2eaf-ba59-4c5c-b40b-5d866a55672e_200x200.png?1563814596359" />

        <h3 className="fancyText">GRIMWIRE</h3>

    </div>
}

export default Footer;
