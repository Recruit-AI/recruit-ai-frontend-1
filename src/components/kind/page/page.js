import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap'

import FormInsert from '../../forms/handler'
import {defaultSymbol} from '../../../db/defaultObjects'
import BasicInfo from './basicInfo'
import SymbolList from './symbolList'
import ImageGallery from '../../imageGallery/gallery'
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
            .then(res =>
              this.setState({kind: res.data, loading: false})
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

            { curr_user ?  <Link to="/collections/new">Create Collection</Link> : "" }
            <Link to="/collections">Back to Collections</Link>

            <BasicInfo item={item} createdBy={this.state.createdBy} usedBy={this.state.usedBy} />
            <ImageGallery item={item} key={item.kind_ids}/>
            <SymbolList item={item} relatedSymbols={this.state.relatedSymbols} updatePage={this.updatePage} />

      </div> : ( this.state.loading ?
        <div className="loader" style={{height:'60px',margin:'20px'}}><img className="loaderImg" src={require('../../../img/yyloader.gif')} /></div>
        : <div className="failedSearch">Sorry, there was an error. This page does not exist.</div>
    )

}</CSSTransition></SwitchTransition>}

}

export default KindPage;
