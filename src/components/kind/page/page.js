import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap'

import FormInsert from '../../forms/handler'
import {defaultSymbol} from '../../../db/defaultObjects'
import BasicInfo from './basicInfo'
import SymbolList from './symbolList'
import ImageGallery from '../../imageGallery/gallery'

const curr_user = localStorage.user ? JSON.parse(localStorage.user) : false

class KindPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            kind: {}
        }
    }

    componentDidMount = () => { this.updatePage() }
    componentWillReceiveProps = (newProps) => { this.updatePage(newProps) }

    updatePage = (props = this.props) => {
        const id = props.match.params.id
        axios
            .get(`https://grimwire.herokuapp.com/api/kinds/${id}`)
            .then(res =>
              this.setState({kind: res.data})
            )
            .catch(err => console.log(err) );
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
        return typeof item !== 'undefined' && Object.keys(item).length > 0 ? <div>
            { curr_user ?  <Link to="/collections/new">Create Collection</Link> : "" }
            <Link to="/collections">Back to Collections</Link>

            <BasicInfo item={item} createdBy={this.state.createdBy} usedBy={this.state.usedBy} />
            <ImageGallery item={item} />
            <SymbolList item={item} relatedSymbols={this.state.relatedSymbols} updatePage={this.updatePage} />

        </div> : "Loading or not found"

    }
}

export default KindPage;
