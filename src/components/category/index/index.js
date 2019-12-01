import React from 'react'
import axios from 'axios'
import {Row, Col} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import Pagination from '../../shared/pagination'
import {CSSTransition, SwitchTransition} from 'react-transition-group'


//This component is used to build a 'complete' list, used for calling searches and passing props to the actual list component.

class Categories extends React.Component {
    constructor(props) {
        super(props);
        const params = new URLSearchParams(window.location.search)
        this.state = {
          categories: [],
          pager: {},
          pageNumber: params.get('page') || 1,
          sort: params.get('sort') || "category_number",
          sortdir: params.get('sortdir') || "ASC",
          searchTerm: "",
          update:true,
          params: params,
          loading: false


        }
    }

    componentDidMount = () => {
      this.loadPage();
    }
    componentDidUpdate = () => {
      if(this.state.update){
        this.loadPage();
      }
    }

    loadPage = () => {
      this.setState({loading:true,update:false})
      const {pageNumber, sort, sortdir, searchTerm} = this.state
      axios
          .get(`https://grimwire.herokuapp.com/api/categories?page=${pageNumber}&sort=${sort}&sortdir=${sortdir}&search=${searchTerm}`)
          .then(res =>
            this.setState({
              categories: res.data.pageOfItems,
              pager: res.data.pager,
              loading: false
            })
          )
          .catch(err => console.log(err) );
    }

    goToPage = (e) => {
      let params = this.state.params
      const pageNumber =  e.target.attributes.page.value
      params.set('page', pageNumber)
      this.setState({pageNumber, params, update:true})
      window.history.replaceState({}, "", window.location.pathname + '?' + params.toString());
    }

    toggleSortDir = (e) => {
      let params = this.state.params
      const newSortdir = this.state.sortdir === "ASC" ? "DESC" : "ASC"
      params.set('sortdir', newSortdir)
      this.setState({sortdir: newSortdir, update:true, params})
      window.history.replaceState({}, "", window.location.pathname + '?' + params.toString());
    }

    changeSort = (e) => {
      const sort = e.target.attributes.sortTerm.value
      if(sort === this.state.sort) { this.toggleSortDir() }
      let params = this.state.params
      params.set('sort', sort)
      this.setState({ sort, update:true, params })
      window.history.replaceState({}, "", window.location.pathname + '?' + params.toString());
    }


    handleChange = (e) => {
      this.setState({searchTerm: e.target.value, update:true})
    }

    sendSearch = (e) => {
      e.preventDefault()
    }


    render() {
        //a key is created by appending each id onto each other, creating at most a length-60 string, up to 100,000 entries
        const renderKey = this.state.categories.length > 1 ? this.state.categories.reduce((sum, item) => { return `${sum}${item.category_id}`}) : "0"

        return <div className="container" id="categorySearch">

            <div className="componentSearchBar">
              <button className={`page-button ${this.state.sort === 'category_name' ? 'page-button-active' : "" }`} onClick={this.changeSort} sortTerm={"category_name"} >
                Sort Alphabetically { this.state.sort === 'category_name' ? this.state.sortdir === "ASC" ? "(A-Z)" : "(Z-A)" : "" }
              </button>
              <button className={`page-button ${this.state.sort === 'category_number' ? 'page-button-active' : "" }`} onClick={this.changeSort} sortTerm={"category_number"} >
                Sort by Number { this.state.sort === 'category_number' ? this.state.sortdir === "ASC" ? "(Beginner)" : "(Advanced)" : "" }
              </button>

              <input className="page-field" type='text' onChange={this.handleChange} type="text"
                name="search" placeholder="Search by name"
                value={this.state.searchTerm} />
            </div>


          <div style={{display: this.state.loading && this.state.categories.length !== 0 ? "block" : "none"}} className="loader"><img className="loaderImg" src={require('../../../img/yyloader.gif')} /></div>
          <Pagination pages={this.state.pager.pages} callback={this.goToPage} currentPage={this.state.pager.currentPage} totalPages={this.state.pager.totalPages} />


            <div id="search-window">
                {
                  this.state.categories.length > 0 ?

                            <SwitchTransition><CSSTransition key={renderKey}
                              in={true} timeout={150} classNames="search-page" unmountOnExit>
                              <div key={renderKey}>
                                <Row>
                              {this.state.categories.map(category =>
                                <Col key={category.category_name} lg={3}><Link className='blockLink' to={`/categories/${category.category_id}`}>
                                  
                                  <img src={category.image_url} width="100%" /> {console.log(category)}
                                  <h5>{category.category_name} {category.category_number}</h5>
                                  <p>{category.category_description}</p>

                                  </Link>
                                </Col>)}
                              </Row>
                          </div>
                          </CSSTransition></SwitchTransition>

                    : (this.state.searchTerm === "" ?
                      <div className="loader" style={{height:'60px',margin:'20px'}}><img className="loaderImg" src={require('../../../img/yyloader.gif')} /></div>
                      : <div className="failedSearch">Sorry. There are no results for that term.</div>
                    )
                }

            </div>



          <Pagination pages={this.state.pager.pages} callback={this.goToPage} currentPage={this.state.pager.currentPage} totalPages={this.state.pager.totalPages} />
          <div style={{display: this.state.loading && this.state.categories.length !== 0 ? "block" : "none"}} className="loader"><img className="loaderImg" src={require('../../../img/yyloader.gif')} /></div>
          <span style={{cursor:'pointer'}} onClick={() => {document.querySelector('#categorySearch').scrollIntoView(true)}}>To Top</span>
        </div>
    }
}


export default Categories;
