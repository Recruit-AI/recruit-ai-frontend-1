import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Home(props) {
	const popCollections = [
		{ name: 'Astrology Signs', id: 3 },
		{ name: 'Planets', id: 12 },
		{ name: 'Elements', id: 11 },
		{ name: 'Crystals', id: 9 },
		{ name: 'Chakras', id: 4 },
		{ name: 'Tarot Cards', id: 1 },
		{ name: 'All', id: '' }
	];

	const popClasses = [
		{ name: 'Magick (101)', id: 2 },
		{ name: 'Beings & Creatures (108)', id: 17 },
		{ name: 'Magick Correspondences (110)', id: 19 },
		{ name: 'Tarot Reading (151)', id: 14 },
		{ name: 'Tarot & The Sepiroth (211)', id: 18 },
		{ name: 'All', id: '' }
	];

	const popPantheons = [
		{ name: 'Wicca', id: 5 },
		{ name: 'Thelema', id: 49 },
		{ name: 'Paganism', id: 60 },
		{ name: 'Chaos Magick', id: 61 },
		{ name: 'All', id: '' }
	];
	return (
		<div>
			<div className="pageCTA">
				<div>
					<img height="100px" alt="logo" src={require('../../img/logo.png')} />
					<h1>GRIMWIRE</h1>

					<h2>The Online Magick, Witchraft, and Spirituality Grimoire</h2>
					<h3>Currently over 1,000+ items in 75+ different collections, including:</h3>
					<h3>
						General Theory, Tarot Cards, Greek Myths, Crystals, Chakras, Herbs, and Astrology, and MUCH more
					</h3>

					<br />

					<i>See what we have to offer.</i>
					<br />
					<Link className="nice-button nice-button-primary" to="/pages/features">
						See Features <i className="fas fa-star" />
					</Link>

					<Link className="nice-button" to="/users/register">
						Sign Up for Mailing List
					</Link>
					<br />
					<i>Be the first to get updates on future & official releases!</i>
					<hr />
				</div>
			</div>

			<div className="divider" />

			<div className="indexBar pageDarkSection">
				<h2>Welcome to GrimWire</h2>
				<hr />
				<Container>
					<Row>
						<Col xs={12} lg={4}>
							<h3>Quick Links</h3>
							<h5>Popular Categories</h5>
							{popClasses.map((item) => <Link to={`/categories/${item.id}`}>{item.name}</Link>)}

							<h5>Popular Collections</h5>
							{popCollections.map((item) => <Link to={`/collections/${item.id}`}>{item.name}</Link>)}

							<h5>Popular Pantheons</h5>
							{popPantheons.map((item) => <Link to={`/pantheons/${item.id}`}>{item.name}</Link>)}
						</Col>

						<Col xs={12} lg={8}>
							<h3>What We Do</h3>
							<p>
								We're not just an online spellbook. We have a massive, completely interlinked item
								system, and a custom application designed to scale to handle the tens of thousands of
								items out there.
							</p>
							<p>
								Everything- from astrology signs, to crystals, to religions, to classes where you can
								track your own progress in places you care about- have their own article with
								information, and are tagged corresponding items.
							</p>
							<p>We're creating the tools to allow you to create your own Book of Shadows.</p>

							<h3>What We Have</h3>
							<p>
								We offer perspective on the spiritual mysteries and desires that go widely unanswered in
								today's culture.
							</p>
							<p>
								We are unbiased as far as path, tradition, and anything else, but do have a sitewide set
								of guidelines and good practices that allow us all to communicate across experiences.
							</p>
							<p>
								Our ultimate goal is the collection, collaboration, and organization of all human
								religions, spiritualities, and cultures.
							</p>
							<p>We are starting with Wicca, Paganism, Chaos Magic, The Occult, and Eastern Mysticism.</p>
						</Col>
					</Row>
				</Container>
			</div>

			<div className="reverse-divider" />

			<Container>
				<Row className="homeImageLinks">
					<Col  md={6} xs={12}>
						<Link to="/pantheons" className="homeImageLink-bg">
							<div className="homeImageLink">
								<h2>All Pantheons</h2>
								<div
									className="imageLinkImage"
									style={{ background: `url(${require('../../img/main-pantheon.jpg')})`, 
                  backgroundPosition: 'center',
                  backgroundSize: 'cover' }}
								/>
								<p>
									Religions, groups, organizations, and teachings throughout history. Complete
									histories & informations.
								</p>
							</div>
						</Link>
					</Col>
					<Col md={6} xs={12}>
						<Link
							to="/collections"
							className="homeImageLink-bg"
						>
							<div className="homeImageLink">
								<h2>All Collections</h2>
                
								<div
									className="imageLinkImage"
                  style={{
                    background: `url(${require('../../img/main-collection.jpg')})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover'
                  }}
								/>
								<p>
									Tarot Cards, Crystals, Astrological Signs, Angels, Demons, and the lists &
									collections that make up GrimWire.
								</p>
							</div>
						</Link>
					</Col>
					<Col md={6} xs={12}>
						<Link
							to="/categories"
							className="homeImageLink-bg"
						>
							<div className="homeImageLink">
								<h2>All Categories</h2>
								<div
									className="imageLinkImage"
                  style={{
                    background: `url(${require('../../img/main-category.jpg')})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover'
                  }}
								/>
								<p>
									Only looking for Wicca 101? Or the spellworking sections? Categories groups together
									collections for easier absorption.
								</p>
							</div>
						</Link>
					</Col>
					<Col  md={6} xs={12}>
						<Link
							to="/symbols"
							className="homeImageLink-bg"
						>
							<div className="homeImageLink">
								<h2>Search Symbols</h2>
								<div
									className="imageLinkImage"
                  style={{
                    background: `url(${require('../../img/main-symbol.jpg')})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover'
                  }}
								/>
								<p>The whole list of symbols & objects, all the magickal things we have</p>
							</div>
						</Link>
					</Col>
				</Row>
			</Container>

			<div className="divider" />
			<div className="indexBar pageDarkSection">
				<h4>Can We Help You?</h4>
				<p>Are you new to Wicca and wondering where to begin? Are you trying to start doing magic spells?</p>
				<p>
					Are you wondering where these ideas and beliefs come from? What is Paganism and where did it come
					from?
				</p>
				<p>
					Are you trying to find your path and are wondering which one is right for you? Whats the difference
					between Witchcraft and Wicca?
				</p>
				<p>Are you trying to figure out how it all works, and learn all you can? What exactly is a Witch?</p>
				<p>Or do you have all this, and just need an awesome way to keep track of it all?</p>

				<Link className="nice-button" to="/users/register">
					Register an Account
				</Link>
				<br />
			</div>

			<div className="reverse-divider" />
		</div>
	);
}

export default Home;
