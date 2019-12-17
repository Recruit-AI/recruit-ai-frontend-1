import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'
import api from '../../helpers/api'

import HandleForm from '../forms/handler'

import defaults from  '../../db/defaultObjects'

const curr_user = localStorage.user ?  JSON.parse(localStorage.user) : false

class NewPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        post: {}
    }
  }

  componentDidMount = () => { this.updateInfo(); }
  componentWillReceiveProps = (newProps) => {this.updateInfo(newProps);}


  updateInfo = (props = this.props) => {
      const id = props.match.params.id
      axios
          .get(api.apiPath(`/teams/${id}`))
          .then(res =>
            this.setState({post: res.data})
          )
          .catch(err => console.log(err) );
  }

  render() {
    const item = this.state.post
    const formFields = defaults.defaultFullFields('team', item)

    return <div  className="tpBlackBg">

        <HandleForm item={formFields} formClass={"teams"} update={this.updateInfo} redirectIdField={"team_id"}/>
        
      </div>
  }
}

export default NewPage;
