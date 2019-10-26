import React from 'react';
import axios from 'axios';
import FullKindList from '../lists/full';

//This component is used to build a 'complete' list, used for calling searches and passing props to the actual list component.

class Kinds extends React.Component {
    constructor(props) {
        super(props);
        const params = new URLSearchParams(window.location.search)
        this.state = {
          kinds: [],
          pager: {},
          pageNumber: params.get('page') || 1,
          sort: params.get('sort') || "kind_name",
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
          .get(`https://grimwire.herokuapp.com/api/kinds?page=${pageNumber}&sort=${sort}&sortdir=${sortdir}&search=${searchTerm}`)
          .then(res =>
            this.setState({
              kinds: res.data.pageOfItems,
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



    render() {
        return <div className="container">
            <div className="componentSearchBar">
              <button className={`page-button ${this.state.sort === 'kind_name' ? 'page-button-active' : "" }`} onClick={this.changeSort} sortTerm={"kind_name"} >
                Sort Alphabetically { this.state.sort === 'kind_name' ? this.state.sortdir === "ASC" ? "(A-Z)" : "(Z-A)" : "" }
              </button>

              <input className="page-field" type='text' onChange={this.handleChange} type="text"
                name="search" placeholder="Search by name"
                value={this.state.searchTerm} />
            </div>

            <FullKindList kinds={this.state.kinds} />

            <div class="paginationLinks">
            { this.state.pager.currentPage && this.state.pager.currentPage > 2 ?
              <span onClick={this.goToPage} page={1} >First</span>
            : "" }

            { this.state.pager.currentPage && this.state.pager.currentPage > 1 ?
                <span onClick={this.goToPage} page={this.state.pager.currentPage - 1} >Previous</span>
              : "" }

            { this.state.pager.pages ? this.state.pager.pages.map(page => <span>
              <span onClick={this.goToPage} page={page} style={{textDecoration: this.state.pager.currentPage==page ? 'underline' : 'none'}} >{page}</span>
            </span>) : "" }

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


export default Kinds;
