import React from 'react';
import axios from 'axios';

import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import FormInsert from '../../forms/handler'
import {defaultKind} from '../../../db/defaultObjects'

import BasicInfo from './basicInfo'
import History from './history'
import Collections from './collections'
import ImageGallery from '../../imageGallery/gallery'
import {CSSTransition, SwitchTransition} from 'react-transition-group'

const curr_user = localStorage.user ?  JSON.parse(localStorage.user) : false


class PantheonPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pantheon: {},
            loading: true
        }
    }

    componentDidMount = () => { this.updateInfo(); }
    componentWillReceiveProps = (newProps) => {this.updateInfo(newProps);}

      updateInfo = (props = this.props) => {
        this.setState({loading:true})
        const id = props.match.params.id
        axios
            .get(`https://grimwire.herokuapp.com/api/pantheons/${id}`)
            .then(res =>
              this.setState({pantheon: res.data, loading: false})
            )
            .catch(err => {
              console.log(err);
              this.setState({pantheon: {}, loading: false})
            } );
    }

    render() {
        const item = this.state.pantheon
        return <SwitchTransition><CSSTransition key={`pantheons-${this.props.match.params.id}`}
          in={true} timeout={350} classNames="whole-page" unmountOnExit appear enter exit>
            {typeof item !== 'undefined' && Object.keys(item).length > 0 && !this.state.loading ?
            <div>

          <Link to="/pantheons">Back to Pantheons</Link> { curr_user ?  <Link to="/pantheons/new">Create Pantheon</Link> : "" }
                <BasicInfo item={item}>
                  { curr_user ? <span>
                    <Link to={`/pantheons/${item.pantheon_id}/edit`}>Edit This Pantheon</Link>
                    <Link to={`/collections/new?pantheon_id=${item.pantheon_id}`}>Add a New Collection</Link>
                  </span> : "" }
                  <History item={item} />
                  <Collections item={item} />
                  <ImageGallery item={item} key={item.pantheon_id}/>
                </BasicInfo>



                  <div>
                      <h4>History & Background</h4>
                      <p>{item.pantheon_history_text || "Please fill in."}</p>
                      <h4>Culture & Advancements</h4>
                      <p>{item.pantheon_culture_text || "Please fill in."}</p>
                  </div>

            </div> : ( this.state.loading ?
              <div className="loader" style={{height:'60px',margin:'20px'}}><img className="loaderImg" src={require('../../../img/yyloader.gif')} /></div>
              : <div className="failedSearch">Sorry, there was an error. This page does not exist.</div>
          )

    }</CSSTransition></SwitchTransition>}
}

export default PantheonPage
