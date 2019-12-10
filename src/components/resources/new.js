import React from 'react';
import {Link} from 'react-router-dom'

import HandleForm from '../forms/handler'

class NewResource extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
  const curr_user = localStorage.user ?  JSON.parse(localStorage.user) : false
  const defaultResource = {
    resource_link: "", 
    resource_type: "",
    resource_title: "",
    resource_tags: [], 
    resource_description: ""
  }
    return <div  className="tpBlackBg">
        { curr_user ?  <Link to="/resources">Back To All</Link> : ""}
        <HandleForm item={defaultResource} formClass={"resources"} update={() => {}}/>
      </div>
  }
}

export default NewResource;
