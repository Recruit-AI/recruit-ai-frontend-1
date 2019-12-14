import React from 'react';
import {siteTitle, logoURL} from '../helpers/site'
import {Row, Col} from 'reactstrap'
import {Link} from 'react-router-dom'

function Home(props) {

	const squares = [
		{
			title: "Manage Your Recruits",
			description: "",
			symbol: "users",
			linkDescription: "See Features",
			link: ""
		},
		{
			title: "Sign Up For The Release",
			description: "The full product is still under development, but you can be the first to know about it's release.",
			symbol: "certificate",
			linkDescription: "Sign Up",
			link: ""
		},
		{
			title: "Made By People Who Care",
			description: "Founder LeRoy Garnder started this to solve his own needs",
			symbol: "dumbbell",
			linkDescription: "See The Team",
			link: ""
		},
	]

	return <div style={{maxWidth:'800px',margin:'40px auto',textAlign:'center'}}>
		
		<h2>Making recruiting smoother</h2>
		<img alt="logo" height="100px" src={logoURL} />
		<h1>{siteTitle}</h1>
		<hr />
		<Row>
			{squares.map(({title, description, symbol, link, linkDescription}) => 

				<Col lg={4} sx={12}> 
				<div style={{padding:"20px"}}>
					<div style={{fontSize:"48px"}} className={`fas fa-${symbol}`}></div>
					<h3>{title}</h3>
					<p>{description}</p>
					<Link className="nice-button" to={link}>{linkDescription}</Link>
					</div>	
				</Col>
			)}
		</Row>
		

	</div>
}

export default Home;
