import React from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom';

import BasicInfo from './basicInfo';
import History from './history';
import Collections from './collections';
import ImageGallery from '../../imageGallery/gallery';

import TextOutput from '../../shared/textOutput';
import Sources from '../../sources/sourcesList';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

import Helmet from 'react-helmet'

const curr_user = localStorage.user ? JSON.parse(localStorage.user) : false;

class PantheonPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			pantheon: {},
			loading: true
		};
	}

	componentDidMount = () => {
		this.updateInfo();
	};
	componentWillReceiveProps = (newProps) => {
		this.updateInfo(newProps);
	};

	updateInfo = (props = this.props) => {
		this.setState({ loading: true });
		const id = props.match.params.id;
		axios
			.get(`https://grimwire.herokuapp.com/api/pantheons/${id}`)
			.then((res) => {
				this.setState({ pantheon: res.data, loading: false })
				const params = new URLSearchParams(window.location.search)
				params.set('article', encodeURI(this.state.pantheon.pantheon_name.replace(/ /g, "-")))
				window.history.replaceState({}, "", window.location.pathname + '?' + params.toString());
			})
			.catch((err) => {
				console.log(err);
				this.setState({ pantheon: {}, loading: false });
			});
	};

	render() {
		const item = this.state.pantheon;
		return (
			<SwitchTransition>
				<CSSTransition
					key={`pantheons-${this.props.match.params.id}`}
					in={true}
					timeout={350}
					classNames="whole-page"
					unmountOnExit
					appear
					enter
					exit
				>
					{typeof item !== 'undefined' && Object.keys(item).length > 0 && !this.state.loading ? (
						<div>


			<Helmet>
                <title>{`GrimWire.Online- ${item.pantheon_name}- The History of ${item.pantheon_name}`}</title>
        </Helmet>



							<Link to="/pantheons">Back to Pantheons</Link>{' '}{curr_user ? (
									<span>
										<Link to="/pantheons/new">Create Pantheon</Link>
										<Link to={`/pantheons/${item.pantheon_id}/edit`}>Edit This Pantheon</Link>
										<Link to={`/collections/new?creator_pantheon_id=${item.pantheon_id}`}>
											Add a New Collection
										</Link>
									</span>
								) : (
									''
								)}
							<br /><br />
							<div className="divider" />
							<div className="text-container">
							<BasicInfo item={item} />
							</div>
							
							<div className="reverse-divider" />
							
							
							<div className="text-container">
							<History item={item} />
							<Collections item={item} />
							</div>
							
							<ImageGallery item={item} key={item.pantheon_id} />
							
							<TextOutput text={item.pantheon_overview_text} title={'Overview'} />
							<TextOutput text={item.pantheon_history_text} title={'History & Background'} />
							<TextOutput text={item.pantheon_culture_text} title={'Culture & Advancements'} />

							<Sources item={item} />
						</div>
					) : this.state.loading ? (
						<div className="loader" style={{ height: '60px', margin: '20px' }}>
							<img className="loaderImg" src={require('../../../img/yyloader.gif')} />
						</div>
					) : (
						<div className="failedSearch">Sorry, there was an error. This page does not exist.</div>
					)}
				</CSSTransition>
			</SwitchTransition>
		);
	}
}

export default PantheonPage;
