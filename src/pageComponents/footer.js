import React from 'react'
import {NavLink} from 'react-router-dom'

function Footer() {
    return <div className="footer">
      
        <div>
         ~ <NavLink to="/">Home</NavLink> ~
        <NavLink to="/pages/features">Features</NavLink> ~
        <NavLink to="/pages/questions">FAQ</NavLink> ~
        <NavLink to="/pages/magick-statement">Rules & Guidelines</NavLink> ~
        <NavLink to="/pages/shop">Shop</NavLink> ~
        <NavLink to="/feedback/provide">Contact/Report</NavLink> ~
        </div>


        <h1>
          <img alt="logo" height="50px" src="https://www.freelogodesign.org/file/app/client/thumb/d61a2eaf-ba59-4c5c-b40b-5d866a55672e_200x200.png?1563814596359" />
          <br />GRIMWIRE  
        </h1>


        <NavLink to="/pages/privacy-policy">Our Privacy Policy</NavLink><br />
        <a href="https://www.google.com/policies/privacy/partners/">How Google Analytics uses data when you use our app</a><br />
      
        

    </div>
}

export default Footer;
