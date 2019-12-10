import React from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'
import Helmet from 'react-helmet'

import BasicInfo from './basicInfo'
import ImageGallery from '../../imageGallery/gallery'
import Connections from './connections'
import Sources from '../../sources/sourcesList'
import Resources from './resourcesList'
import TextOutput from '../../shared/textOutput';

import ArticleImageCreator from '../../shared/articleImageCreator/imageCreator'

import { CSSTransition, SwitchTransition } from 'react-transition-group'

const curr_user = localStorage.user ? JSON.parse(localStorage.user) : false

class SymbolPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      symbol: {},
      loading: true
    }
  }

  componentDidMount = () => {
    this.updateSymbolAndConnections()
  }

  componentWillReceiveProps = (newProps) => {
    this.updateSymbolAndConnections(newProps)
  }


  updateSymbolAndConnections = (props = this.props) => {
    this.setState({ loading: true })
    axios
      .get(`https://grimwire.herokuapp.com/api/symbols/${props.match.params.id}`)
      .then(res => {
        this.setState({ symbol: res.data, loading: false })
				const params = new URLSearchParams(window.location.search)
				params.set('article', encodeURI(this.state.symbol.symbol_name.replace(/ /g, "-")))
				window.history.replaceState({}, "", window.location.pathname + '?' + params.toString());
      })
      .catch(err => {
        console.log(err);
        this.setState({ symbol: {}, loading: false })
      });
  }



  render() {
    const item = this.state.symbol

    return <SwitchTransition><CSSTransition key={`symbols-${this.props.match.params.id}`}
      in={true} timeout={350} classNames="whole-page" unmountOnExit appear enter exit>
    

      {typeof item !== 'undefined' && Object.keys(item).length > 0 && !this.state.loading ?
        <div>
    
        <Helmet>
                <title>{`GrimWire.Online- ${item.symbol_name}- All About ${item.kind.kind_name}`}</title>
        </Helmet>


          <Link to="/symbols">Search All Symbols</Link>
          {curr_user ? <Link to="/symbols/new">Create Symbol</Link> : ""}
          {curr_user ? <Link to={`/symbols/${this.props.match.params.id}/edit`}>Edit This Symbol</Link> : ""}
          
          {item.relatedNameSymbols.length > 0 ? <div>This article is about {item.symbol_name}. Please see:</div> : ""}

          {item.relatedNameSymbols.map(rns => <Link to={`/symbols/${rns.symbol_id}`}>{rns.symbol_name}</Link>) }


          <BasicInfo item={item} />
          <ImageGallery item={item} key={item.symbol_id} />
          <Connections item={item} />


          <div>
            <TextOutput text={item.symbol_overview_text} title={'Background'} />
            <TextOutput text={item.symbol_meaning_text} title={'Meaning'} />
          </div>


          <Resources item={item} />
          <Sources item={item} />


          <ArticleImageCreator item={item} imageKind={"Correspondences"} />


        </div>
        : (this.state.loading ?
          <div className="loader" style={{ height: '60px', margin: '20px' }}><img className="loaderImg" src={require('../../../img/yyloader.gif')} /></div>
          : <div className="failedSearch">Sorry, there was an error. This page does not exist.</div>
        )}</CSSTransition></SwitchTransition>

  }
}

export default SymbolPage;
