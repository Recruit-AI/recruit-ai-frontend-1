import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap'

import FormInsert from '../../forms/handler'
import {defaultSymbol} from '../../../db/defaultObjects'
import BasicInfo from './basicInfo'
import SymbolList from './symbolList'
import ImageGallery from '../../imageGallery/gallery'

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
            .get(`http://localhost:4001/api/kinds/${id}`)
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

            <BasicInfo item={item} createdBy={this.state.createdBy} usedBy={this.state.usedBy} />
            <ImageGallery item={item} />
            <SymbolList item={item} relatedSymbols={this.state.relatedSymbols} />

        </div> : "Loading or not found"

    }
}

export default KindPage;
