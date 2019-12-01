import React from 'react'
import {withRouter, Link} from 'react-router-dom'
import axios from 'axios'
import {Form} from 'react-bootstrap'


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
    this.setState({loading: true, update: false})
    axios.get('https://grimwire.herokuapp.com/api/resources')
    .then(res => {
      this.setState({resources: res.data.pageOfItems, pager: res.data.pager, loading: false})
    })
  }


  render() {
      return <div>
        <h1>External Resources</h1>
        {/*tag cloud
        //type radio
        //searchTerm 
        sort dir 
        page #*/}
        <Form>
          <Form.Group>
            
          </Form.Group>
        </Form>
        <hr />
        {
          this.state.resources.map((resource) => <div>
            <h3>{resource.resource_title}</h3>
            <a href={`${resource.resource_link}`}>{resource.resource_type} Link</a>
            <p>{resource.resource_description}</p>
            <p>Tags: { (resource.resource_tags || []).map((tag) => <span style={{padding:'5px'}}>{tag}</span> ) }</p>

            { curr_user.user_role > 1 ? <Link to={`/resources/edit/${resource.resource_id}`}>Edit</Link> : ""}
            <hr />
          </div>)

        }
        
        { curr_user.user_role > 1 ? <Link className='nice-button' to={`/resources/new`}>(+) Add A Resource</Link> : ""}
      </div>
  }
}


export default withRouter(ResourcesIndex)
