import React from 'react'
import {withRouter, Link} from 'react-router-dom'
import axios from 'axios'
import {Form} from 'react-bootstrap'

import Pagination from '../shared/pagination'


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
    this.setState({loading:true,update:false})
    const {pageNumber, sort, sortdir, searchTerm, tag, type} = this.state
    axios.get(`https://grimwire.herokuapp.com/api/resources?${`page=${pageNumber}`}&sortdir=${sortdir}&search=${searchTerm}&${tag !== '' ? `tag=${tag}` : "" }&${type !== '' ? `type=${type}` : "" }`)
    .then(res => {
      this.setState({resources: res.data.pageOfItems, pager: res.data.pager, loading: false})
    })
  }

  goToPage = (e) => {
    let params = this.state.params
    const pageNumber =  e.target.attributes.page.value
    params.set('page', pageNumber)
    this.setState({pageNumber, params, update:true})
    window.history.replaceState({}, "", window.location.pathname + '?' + params.toString());
  }

  setTag = (e) => {
    let params = this.state.params
    const tag =  e.target.dataset.tag
    params.set('tag', tag)
    this.setState({tag, params, update:true})
    window.history.replaceState({}, "", window.location.pathname + '?' + params.toString());
  }

  clearTag = (e) => {
    let params = this.state.params
    params.delete('tag')
    this.setState({tag: "", params, update:true})
    window.history.replaceState({}, "", window.location.pathname + '?' + params.toString());
  }

  
  handleChange = (e) => {
    let params = this.state.params
    const search = e.target.value
    if(search !== "") {
      params.set('searchTerm', search)
    } else {
      params.delete('searchTerm')
    }
    this.setState({searchTerm: search, params, update:true})
    window.history.replaceState({}, "", window.location.pathname + '?' + params.toString());
  }


  render() {
      return <div>
        <h1>External Resources</h1>
        {/*tag cloud
        //type radio*/}
        <Form>
          <input className="page-field" type='text' onChange={this.handleChange} type="text"
                name="search" placeholder="Search by name"
                value={this.state.searchTerm} />

            {this.state.tag !== '' ? <p className="format-link" onClick={this.clearTag}>Clear Tag</p> : "" }
            
        </Form>
        <hr />
        <Pagination pages={this.state.pager.pages} callback={this.goToPage} currentPage={this.state.pager.currentPage} totalPages={this.state.pager.totalPages} />

        {
          this.state.resources.map((resource) => <div>
            <h3>{resource.resource_title}</h3>
            <a href={`${resource.resource_link}`}>{resource.resource_type} Link</a>
            <p>{resource.resource_description}</p>
            <p>Tags: { (resource.resource_tags || []).map((tag) => <span className="format-link" onClick={this.setTag} data-tag={tag} style={{padding:'5px'}}>{tag}</span> ) }</p>

            { curr_user.user_role > 1 ? <Link to={`/resources/${resource.resource_id}/edit`}>Edit</Link> : ""}
            <hr />
          </div>)

        }
        
        <Pagination pages={this.state.pager.pages} callback={this.goToPage} currentPage={this.state.pager.currentPage} totalPages={this.state.pager.totalPages} />


        { curr_user.user_role > 1 ? <Link className='nice-button' to={`/resources/new`}>(+) Add A Resource</Link> : ""}

        
      </div>
  }
}


export default withRouter(ResourcesIndex)
