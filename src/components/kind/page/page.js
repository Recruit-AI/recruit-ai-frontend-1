import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet'
import {defaultSymbol} from '../../../db/defaultObjects'
import BasicInfo from './basicInfo'
import SymbolList from './symbolList'
import ImageGallery from '../../imageGallery/gallery'
import Sources from '../../sources/sourcesList'
import {CSSTransition, SwitchTransition} from 'react-transition-group'



const curr_user = localStorage.user ? JSON.parse(localStorage.user) : false

class KindPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            kind: {},
            loading: true
        }
    }

    componentDidMount = () => { this.updatePage() }
    componentWillReceiveProps = (newProps) => { this.updatePage(newProps) }

    updatePage = (props = this.props) => {
      this.setState({loading:true})
        const id = props.match.params.id
        axios
            .get(`https://grimwire.herokuapp.com/api/kinds/${id}`)
            .then(res => {
              this.setState({kind: res.data, loading: false})
              const params = new URLSearchParams(window.location.search)
              params.set('article', encodeURI(this.state.kind.kind_name.replace(/ /g, "-")))
              window.history.replaceState({}, "", window.location.pathname + '?' + params.toString());
            }
            )
            .catch(err => {
              console.log(err);
              this.setState({kind: {}, loading: false})
            } );
    }



    defaultSymbolWithInfo = () => {
        const item = this.state.kind
        return {
            ...defaultSymbol,
            info: item.extraInfoDefault,
        }
    }

    render() {
        const item = this.state.kind
        return <SwitchTransition><CSSTransition key={`pantheons-${this.props.match.params.id}`}
          in={true} timeout={350} classNames="whole-page" unmountOnExit appear enter exit>
            {typeof item !== 'undefined' && Object.keys(item).length > 0 && !this.state.loading ?
            <div>
              
    
        <Helmet>
                <title>{`GrimWire.Online- ${item.kind_name}- Information on All ${item.kind_name}`}</title>
        </Helmet>

            { curr_user ?  <span><Link to="/collections/new">Create Collection</Link> 
            <Link to={`/collections/${item.kind_id}/edit`}>Edit This Collection</Link> 
            <Link to={`/symbols/new?symbol_kind_id=${item.kind_id}`}>New Symbol</Link></span> : "" }
            <Link to="/collections">Back to Collections</Link>

            {item.kindSymbolConnections.length > 0 ? 
                <div>This article is a list of {item.kind_name}. </div> : ""}

            { 
              item.kindSymbolConnections.map(ksc => <div>
                For more general information, please see <Link to={`/symbols/${ksc.symbol_id}`}>{ksc.symbol_name} ({ksc.connected_symbol_kind_name})</Link>
              </div>) 
            }

            <BasicInfo item={item}>
              <ImageGallery item={item} key={item.kind_ids}/>
            </BasicInfo>

            <SymbolList item={item} updatePage={this.updatePage} />

            <Sources item={item} />

      </div> : ( this.state.loading ?
        <div className="loader" style={{height:'60px',margin:'20px'}}><img className="loaderImg" src={require('../../../img/yyloader.gif')} /></div>
        : <div className="failedSearch">Sorry, there was an error. This page does not exist.</div>
    )

}</CSSTransition></SwitchTransition>}

}

export default KindPage;
