import React from 'react'
import {withRouter} from 'react-router-dom'
import axios from 'axios'


const curr_user = localStorage.user ?  JSON.parse(localStorage.user) : false
const headers = { headers: {'authorization': localStorage.token} }

class ResourcesIndex extends React.Component {
  constructor(props) {
    super(props);
    const params = new URLSearchParams(window.location.search)
    this.state = {
      resources: [],
      pager: {},
      pageNumber: params.get('page') || 1,
      sortdir: params.get('sortdir') || "ASC",
      tag: params.get('tag') || '',
      type: params.get('type') || '',
      searchTerm: params.get('searchTerm') || "",
      params: params,
      update:true,
      loading: false
    }
  }

  componentDidMount = () => {
    this.loadPage();
  }

  componentDidUpdate = () => {
    if(this.state.update) {
      this.setState({update: false})
      this.loadPage();
    }
  }

  loadPage = () => {

  }


  render() {
      return <div>

      </div>
  }
}


export default withRouter(ResourcesIndex)
