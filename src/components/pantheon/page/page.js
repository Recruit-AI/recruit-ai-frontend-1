import React from 'react';
import axios from 'axios';

import { Row, Col } from 'react-bootstrap'

import FormInsert from '../../forms/insert'
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
                <BasicInfo item={item}>
                  <History item={item} />
                  <ImageGallery item={item} />
                </BasicInfo>

                <Collections item={item} />


                  <div>
                      <h4>History & Background</h4>
                      <p>{item.pantheon_history}</p>
                      <h4>Culture & Advancements</h4>
                      <p>{item.pantheon_culture}</p>
                  </div>

                <Row className="forms">
                    <Col className=""><FormInsert item={item} key={item.id} formClass={"pantheons"} /></Col>
                    <Col className=""><FormInsert item={defaultKind} formClass={"kinds"} /></Col>
                </Row>
            </div> : "Loading... Or object not found."

    }
}

export default PantheonPage
