import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

import Sources from '../../sources/sourcesList';

import TextOutput from '../../shared/textOutput';

import { CSSTransition, SwitchTransition } from 'react-transition-group';

import Helmet from 'react-helmet'

const curr_user = localStorage.user ? JSON.parse(localStorage.user) : false;

class CategoryPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			category: {},
			loading: false
		};
	}

	componentDidMount = () => {
		this.updatePage();
	};
	componentWillReceiveProps = (newProps) => {
		this.updatePage(newProps);
	};

	updatePage = (props = this.props) => {
		this.setState({ loading: true });
		const id = props.match.params.id;
		axios
			.get(`https://grimwire.herokuapp.com/api/categories/${id}`)
			.then((res) => {
				this.setState({ category: res.data, loading: false })
				const params = new URLSearchParams(window.location.search)
				params.set('article', encodeURI(this.state.category.category_name.replace(/ /g, "-")) + "-" 
				+ encodeURI(this.state.category.category_number))
				window.history.replaceState({}, "", window.location.pathname + '?' + params.toString());
				
			})
			.catch((err) => {
				console.log(err);
				this.setState({ category: {}, loading: false });
			});
	};

	render() {
		const item = this.state.category;
		return typeof item !== 'undefined' && Object.keys(item).length > 0 && !this.state.loading ? (
			<SwitchTransition>
				<CSSTransition
					key={`categories-${this.props.match.params.id}`}
					in={true}
					timeout={350}
					classNames="whole-page"
					unmountOnExit
				>
					<div>

					
			<Helmet>
                <title>{`GrimWire.Online- ${item.category_name} ${item.category_number}`}</title>
        </Helmet>

						
						{curr_user ? (
							<span>
								<Link to="/collections/new">Create New Collection/List</Link>
								<Link to={`/categories/${this.props.match.params.id}/edit`}>Edit This Category</Link>
								<Link to="/categories/new">Create Category/Class</Link>
							</span>
						) : (
								''
							)}
						<Link to="/categories/">Back to All Categories</Link>

						<br />
						<br />
						<div class="divider" />

						<div className="text-container">
							<h1>
								{item.category_name} {item.category_number}
							</h1>
							<img
								src={item.thumbnail ? item.thumbnail.image_url : ''}
								alt={item.pantheon_name}
								width="250px"
							/>
							<p>{item.category_description || 'Please fill in.'}</p>
						</div>
						<div className="reverse-divider" />

						<div className="text-container">
							<Row>
								<Col lg={4}>
									<h3>Study Lists</h3>

									{item.kinds ? (
										item.kinds.map((i) => (
											<span>
												<Link key={i.kind_id} to={`/collections/${i.kind_id}`}>
													{i.kind_name}
												</Link>
											</span>
										))
									) : (
											''
										)}
								</Col>
								<Col lg={8}>
									{item.pantheons ? (
										<div>
											<h3>Related Paths & Pantheons</h3>
											{item.pantheons.map((i) => (
												<Link key={i.pantheon_id} to={`/pantheons/${i.pantheon_id}`}>
													{i.pantheon_name}
												</Link>
											))}
										</div>
									) : (
											''
										)}
									{item.symbols ? (
										<div>
											<h3>Related Concepts</h3>
											{item.symbols.map((i) => (
												<Link key={i.symbol_id} to={`/symbols/${i.symbol_id}`}>
													{console.log(i)}
													{i.symbol_name} {i.kind_name}
												</Link>
											))}
										</div>
									) : (
											''
										)}

								</Col>
							</Row>
						</div>


						<TextOutput text={item.category_overview_text} title={'Overview'} />
						<TextOutput text={item.category_sources_text} title={'Getting Started'} />

						<Sources item={item} />


					</div>
				</CSSTransition>
			</SwitchTransition>
		) : this.state.loading ? (
			<div className="loader" style={{ height: '60px', margin: '20px' }}>
				<img className="loaderImg" src={require('../../../img/yyloader.gif')} />
			</div>
		) : (
					<div className="failedSearch">Sorry, there was an error. This page does not exist.</div>
				);
	}
}

export default CategoryPage;
