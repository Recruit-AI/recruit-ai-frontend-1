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
          searchTerm: ""

        }
    }

    componentDidMount = () => {
      this.loadPage();
    }
    componentDidUpdate = () => {
      this.loadPage();
    }

    loadPage = () => {
      const {pageNumber, sort, sortdir, searchTerm} = this.state
      axios
          .get(`http://localhost:4001/api/pantheons?page=${pageNumber}&sort=${sort}&sortdir=${sortdir}&search=${searchTerm}`)
          .then(res =>
            this.setState({
              pantheons: res.data.pageOfItems,
              pager: res.data.pager
            })
          )
          .catch(err => console.log(err) );
    }

    goToPage = (e) => {
      this.setState({pageNumber: e.target.attributes.page.value})
      this.loadPage()
    }

    toggleSortDir = (e) => {
      this.setState({sortdir: this.state.sortdir === "ASC" ? "DESC" : "ASC"})
      this.loadPage()
    }

    changeSort = (e) => {
      this.setState({ sort: e.target.attributes.sortTerm.value })
      this.loadPage()
    }

    handleChange = (e) => {
      this.setState({searchTerm: e.target.value})
    }

    sendSearch = (e) => {
      e.preventDefault()
      this.loadPage()
    }


    render() {
        return <div className="container">
            Sort by:
            <button onClick={this.changeSort} sortTerm={"pantheon_name"} >Alpha</button>
            <button onClick={this.changeSort} sortTerm={"start_year"} >Year</button>
            <button onClick={this.toggleSortDir}>{this.state.sortdir === "ASC" ? "Asc" : "Desc"}</button>
            <input type='text' onChange={this.handleChange} type="text"
              name="search" placeholder="Search"
              value={this.state.searchTerm} />

            <FullPantheonsList pantheons={this.state.pantheons} />

            { this.state.pager.currentPage && this.state.pager.currentPage > 1 ?
              <span onClick={this.goToPage} page={1} >First</span>
            : "" }

            { this.state.pager.currentPage && this.state.pager.currentPage > 1 ?
                <span onClick={this.goToPage} page={this.state.pager.currentPage - 1} >Previous</span>
              : "" }

            { this.state.pager.pages ? this.state.pager.pages.map(page => <span>
              <span onClick={this.goToPage} page={page} >{page}</span>
            </span>) : "" }

            { this.state.pager.currentPage && this.state.pager.currentPage < this.state.pager.totalPages ?
              <span onClick={this.goToPage} page={this.state.pager.currentPage + 1} >Next</span>
            : "" }

            { this.state.pager.currentPage && this.state.pager.currentPage < this.state.pager.totalPages ?
              <span onClick={this.goToPage} page={this.state.pager.totalPages} >Last</span>
            : "" }

        </div>
    }
}


export default Pantheons;
