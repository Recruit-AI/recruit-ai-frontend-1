import React from 'react';
import FullPantheonsList from '../lists/full';
import axios from 'axios';



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
          update:true
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
      const {pageNumber, sort, sortdir, searchTerm} = this.state

      axios
          .get(`https://grimwire.herokuapp.com/api/pantheons?page=${pageNumber}&sort=${sort}&sortdir=${sortdir}&search=${searchTerm}`)
          .then(res =>
            this.setState({
              pantheons: res.data.pageOfItems,
              pager: res.data.pager,
              update: false
            })
          )
          .catch(err => console.log(err) );
    }

    goToPage = (e) => {
      this.setState({pageNumber: e.target.attributes.page.value, update:true})
    }

    toggleSortDir = (e) => {
      this.setState({sortdir: this.state.sortdir === "ASC" ? "DESC" : "ASC", update:true})
    }

    changeSort = (e) => {
      const sort = e.target.attributes.sortTerm.value
      if(sort === this.state.sort) { this.toggleSortDir() }
      this.setState({ sort: sort, update:true })
    }

    handleChange = (e) => {
      this.setState({searchTerm: e.target.value, update:true})
    }

    sendSearch = (e) => {
      e.preventDefault()
    }


    render() {

        return <div className="container">

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


            <FullPantheonsList pantheons={this.state.pantheons} />

            <div class="paginationLinks">
            { this.state.pager.currentPage && this.state.pager.currentPage > 2 ?
              <span onClick={this.goToPage} page={1} >First</span>
            : "" }

            { this.state.pager.currentPage && this.state.pager.currentPage > 1 ?
                <span onClick={this.goToPage} page={this.state.pager.currentPage - 1} >Previous</span>
              : "" }

            { this.state.pager.pages ? this.state.pager.pages.map(page =>
              <span onClick={this.goToPage} page={page} style={{textDecoration: this.state.pager.currentPage==page ? 'underline' : 'none'}}>{page}</span>
            ) : "" }

            { this.state.pager.currentPage && this.state.pager.currentPage < this.state.pager.totalPages ?
              <span onClick={this.goToPage} page={this.state.pager.currentPage + 1} >Next</span>
            : "" }

            { this.state.pager.currentPage && this.state.pager.currentPage+1 < this.state.pager.totalPages ?
              <span onClick={this.goToPage} page={this.state.pager.totalPages} >Last</span>
            : "" }
            </div>

        </div>
    }
}


export default Pantheons;
