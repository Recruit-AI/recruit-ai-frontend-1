import React from 'react';
import axios from 'axios'
import { Row, Col } from 'react-bootstrap'
import {Link} from 'react-router-dom'

import FormInsert from '../../forms/handler'

import BasicInfo from './basicInfo'
import ImageGallery from '../../imageGallery/gallery'
import Connections from './connections'
import Sources from '../../sources/sourcesList'

import ArticleImageCreator from '../../shared/articleImageCreator/imageCreator'

import {defaultConnection} from '../../../db/defaultObjects'
import {CSSTransition, SwitchTransition} from 'react-transition-group'

const curr_user = localStorage.user ?  JSON.parse(localStorage.user) : false

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
      this.setState({loading:true})
      axios
          .get(`https://grimwire.herokuapp.com/api/symbols/${props.match.params.id}`)
          .then(res => {
            this.setState({symbol: res.data, loading: false})
          })
          .catch(err => {
            console.log(err);
            this.setState({symbol: {}, loading: false})
          }  );
    }

    

    render() {
        const item = this.state.symbol

        return <SwitchTransition><CSSTransition key={`symbols-${this.props.match.params.id}`}
        in={true} timeout={350} classNames="whole-page" unmountOnExit appear enter exit>
         {typeof item !== 'undefined' && Object.keys(item).length > 0 && !this.state.loading ?
            <div>

              <Link to="/symbols">Search All Symbols</Link>
              { curr_user ?  <Link to="/symbols/new">Create Symbol</Link> : "" }
              { curr_user ?  <Link to={`/symbols/${this.props.match.params.id}/edit`}>Edit This Symbol</Link> : "" }

              


              <BasicInfo item={item} />
              <ImageGallery item={item} key={item.symbol_id}/>
              <Connections item={item} />


                      <div>
                          <h4>Background:</h4>
                          {item.symbol_overview_text || "Please fill in."}
                          <h4>Meaning:</h4>
                          {item.symbol_meaning_text || "Please fill in."}
                      </div>

                      <Sources item={item} />


              <ArticleImageCreator item={item} imageKind={"Correspondences"} />


         </div>
         : ( this.state.loading ?
           <div className="loader" style={{height:'60px',margin:'20px'}}><img className="loaderImg" src={require('../../../img/yyloader.gif')} /></div>
           : <div className="failedSearch">Sorry, there was an error. This page does not exist.</div>
       )}</CSSTransition></SwitchTransition>

    }
}

export default SymbolPage;
