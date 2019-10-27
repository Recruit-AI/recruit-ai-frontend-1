import React from 'react';
import axios from 'axios';
import SimpleSymbolList from '../lists/simple';
import {Form} from 'react-bootstrap'

//This component is used to build a 'complete' list, used for calling searches and passing props to the actual list component.

class Symbols extends React.Component {
    constructor(props) {
        super(props);
        const params = new URLSearchParams(window.location.search)
        this.state = {
          symbols: [],
          pager: {},
          pageNumber: params.get('page') || 1,
          sort: params.get('sort') || "symbol_name",
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
          .get(`https://grimwire.herokuapp.com/api/symbols?page=${pageNumber}&sort=${sort}&sortdir=${sortdir}&search=${searchTerm}`)
          .then(res => {
              this.setState({
                symbols: res.data.pageOfItems,
                pager: res.data.pager,
                update: false
              });
              console.log(res.data)
            }
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
            <button className={`page-button ${this.state.sort === 'symbol_name' ? 'page-button-active' : "" }`} onClick={this.changeSort} sortTerm={"symbol_name"} >
              Sort Alphabetically { this.state.sort === 'symnbol_name' ? this.state.sortdir === "ASC" ? "(A-Z)" : "(Z-A)" : "" }
            </button>

            <input className="page-field" type='text' onChange={this.handleChange} type="text"
              name="search" placeholder="Search by name"
              value={this.state.searchTerm} />
            </div>


            <SimpleSymbolList symbols={this.state.symbols} />

            <div class="paginationLinks">
            { this.state.pager.currentPage && this.state.pager.currentPage > 2 ?
              <span onClick={this.goToPage} page={1} >First</span>
            : "" }

            { this.state.pager.currentPage && this.state.pager.currentPage > 1 ?
                <span onClick={this.goToPage} page={this.state.pager.currentPage - 1} >Previous</span>
              : "" }

            { this.state.pager.pages ? this.state.pager.pages.map(page =>
              <span onClick={this.goToPage} page={page} style={{textDecoration: this.state.pager.currentPage==page ? 'underline' : 'none'}} >{page}</span>
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


export default Symbols;
