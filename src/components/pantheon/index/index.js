import React from 'react';
import FullPantheonsList from '../lists/full';
import axios from 'axios';
import Pagination from '../../shared/pagination'



const curr_user = localStorage.user ? JSON.parse(localStorage.user) : false
//This component is used to build a 'complete' list, used for calling searches and passing props to the actual list component.

class Pantheons extends React.Component {
    constructor(props) {
        super(props);
        const params = new URLSearchParams(window.location.search)
        this.state = {
          pantheons: [],
          pager: {},
          pageNumber: params.get('page') || 1,
          sort: params.get('sort') || "pantheon_name",
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
          .get(`https://grimwire.herokuapp.com/api/pantheons?page=${pageNumber}&sort=${sort}&sortdir=${sortdir}&search=${searchTerm}`)
          .then(res =>
            this.setState({
              pantheons: res.data.pageOfItems,
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

        return <div className="container" id="pantheonSearch">

            <div className="componentSearchBar">
              <button className={`page-button ${this.state.sort === 'pantheon_name' ? 'page-button-active' : "" }`}  onClick={this.changeSort} sortTerm={"pantheon_name"}>
                 Sort Alphabetically { this.state.sort === 'pantheon_name' ? this.state.sortdir === "ASC" ? "(A-Z)" : "(Z-A)" : "" }
              </button>
              <button className={`page-button ${this.state.sort === 'start_year' ? 'page-button-active' : "" }`}  onClick={this.changeSort} sortTerm={"start_year"} >
                Sort by Year { this.state.sort === 'start_year' ? this.state.sortdir === "ASC" ? "(Oldest)" : "(Recent)" : "" }
              </button>

              <input className='page-field'  type='text' onChange={this.handleChange} type="text"
                name="search" placeholder="Search by name"
                value={this.state.searchTerm} />
            </div>

            <div style={{display: this.state.loading && this.state.pantheons.length !== 0 ? "block" : "none"}} className="loader"><img className="loaderImg" src={require('../../../img/yyloader.gif')} /></div>
            <Pagination pages={this.state.pager.pages} callback={this.goToPage} currentPage={this.state.pager.currentPage} totalPages={this.state.pager.totalPages} />

            <div id="search-window">
                {
                  this.state.pantheons.length > 1 ?
                    <FullPantheonsList pantheons={this.state.pantheons} />
                    : (this.state.searchTerm === "" ?
                      <div className="loader" style={{height:'60px',margin:'20px'}}><img className="loaderImg" src={require('../../../img/yyloader.gif')} /></div>
                      : <div className="failedSearch">Sorry. There are no results for that term.</div>
                    )
                }

            </div>

            <Pagination pages={this.state.pager.pages} callback={this.goToPage} currentPage={this.state.pager.currentPage} totalPages={this.state.pager.totalPages} />
            <div style={{display: this.state.loading && this.state.pantheons.length !== 0 ? "block" : "none"}} className="loader"><img className="loaderImg" src={require('../../../img/yyloader.gif')} /></div>
            <span style={{cursor:'pointer'}} onClick={() => {document.querySelector('#pantheonSearch').scrollIntoView(true)}}>To Top</span>
        </div>
    }
}


export default Pantheons;
