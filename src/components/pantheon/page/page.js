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

class PantheonPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pantheon: {}
        }
    }

    componentDidMount = () => { this.updateInfo(); }
    componentWillReceiveProps = (newProps) => {this.updateInfo(newProps);}

      updateInfo = (props = this.props) => {
        const id = props.match.params.id
        axios
            .get(`http://localhost:4001/api/pantheons/${id}`)
            .then(res =>
              this.setState({pantheon: res.data})
            )
            .catch(err => console.log(err) );
    }

    render() {
        const item = this.state.pantheon
        return typeof item !== 'undefined' && Object.keys(item).length > 0 ? <div>

          <Link to="/pantheons">Back to Pantheons</Link> | <Link to="/pantheons/new">Create Pantheon</Link>
                <BasicInfo item={item}>
                  <Link to={`/pantheons/${item.pantheon_id}/edit`}>Edit This Pantheon</Link>
                  <Link to={`/collections/new?pantheon_id=${item.pantheon_id}`}>Add a New Collection</Link>
                  <History item={item} />
                  <ImageGallery item={item} />
                </BasicInfo>

                <Collections item={item} />


                  <div>
                      <h4>History & Background</h4>
                      <p>{item.pantheon_history_text}</p>
                      <h4>Culture & Advancements</h4>
                      <p>{item.pantheon_culture_text}</p>
                  </div>

            </div> : "Loading... Or object not found."

    }
}

export default PantheonPage
