import React from 'react';
import {Link} from 'react-router-dom'

import HandleForm from '../forms/handler'
import axios from 'axios';

class NewResource extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resource: {}
    }
  }

  componentDidMount = () => { this.updateInfo(); }
  componentWillReceiveProps = (newProps) => {this.updateInfo(newProps);}

  updateInfo = (props = this.props) => {     
    axios.get(`https://grimwire.herokuapp.com/api/resources/${this.props.match.params.id}`)
    .then((res) => { this.setState({ resource: res.data })})
  }

  render() {
    const curr_user = localStorage.user ?  JSON.parse(localStorage.user) : false
    const r = this.state.resource
    const resource = {
      resource_link: r.resource_link || "", 
      resource_type: r.resource_type || "",
      resource_title: r.resource_title || "",
      resource_tags: r.resource_tags || [], 
      resource_description: r.resource_description || ""
    }

    
    delete resource.resource_id
    return <div  className="tpBlackBg">
          { curr_user ?  <Link to="/resources">Back To All</Link> : ""}
          <HandleForm item={resource} formClass={"resources"} update={this.updateInfo} />
    </div>
  }
}

export default NewResource;
