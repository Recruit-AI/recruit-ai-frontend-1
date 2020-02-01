import React from 'react';
import {siteTitle, logoURL} from '../helpers/site'
import {Row, Col} from 'reactstrap'
import {Link} from 'react-router-dom'

function Home(props) {
	const squares = [
		{
			title: "Sign Up",
			link: "/users/register"
		},
		{
			title: "Sign In",
			link: "/users/login"
		},
	]

	return <div style={{maxWidth:'800px',margin:'40px auto',textAlign:'center'}}>
		
		<h1>{siteTitle}</h1>
		<hr />
		<img alt="logo" height="100px" style={{margin:"75px 0 25px"}} src={logoURL} />
		
			{squares.map(({title, link}) => 
			<div>
					<Link className="nice-button" to={link}><h3>{title}</h3></Link>
			</div>)}
		<hr />

	</div>
}

export default Home;
