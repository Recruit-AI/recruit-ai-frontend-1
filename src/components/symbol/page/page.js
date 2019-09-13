import React from 'react';
import axios from 'axios'
import { Row, Col } from 'react-bootstrap'

import FormInsert from '../../forms/handler'

import BasicInfo from './basicInfo'
import ImageGallery from '../../imageGallery/gallery'
import Connections from './connections'

import {defaultConnection} from '../../../db/defaultObjects'

class SymbolPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            symbol: {}
        }
    }

    componentDidMount = () => { this.updateSymbolAndConnections() }
    componentWillReceiveProps = (newProps) => { this.updateSymbolAndConnections(newProps) }

    updateSymbolAndConnections = (props = this.props) => {
      axios
          .get(`http://localhost:4001/api/symbols/${props.match.params.id}`)
          .then(res =>
            this.setState({symbol: res.data})
          )
          .catch(err => console.log(err) );
    }

    render() {
        const item = this.state.symbol

        return <div>
          { typeof item !== 'undefined' && Object.keys(item).length > 0 ?
            <div>
              <BasicInfo item={item} />
              <ImageGallery item={item} />
              <Connections item={item} />


                      <div>
                          <h4>Background:</h4>
                          {item.symbol_overview_text}
                          <h4>Meaning:</h4>
                          {item.symbol_background_text}
                      </div>



            </div>
            : "Loading or not found" }
         </div>
    }
}

export default SymbolPage;
