import React from 'react'
import axios from 'axios'
import {Row, Col} from 'react-bootstrap'
import {Link} from 'react-router-dom'


//This component is used to build a 'complete' list, used for calling searches and passing props to the actual list component.

class Categories extends React.Component {
    constructor(props) {
        super(props);
        const params = new URLSearchParams(window.location.search)
        this.state = {
          categories: [],
          pager: {},
          pageNumber: params.get('page') || 1,
          sort: params.get('sort') || "category_name",
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
          .get(`https://grimwire.herokuapp.com/api/categories?page=${pageNumber}&sort=${sort}&sortdir=${sortdir}&search=${searchTerm}`)
          .then(res =>
            this.setState({
              categories: res.data.pageOfItems,
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

              <Row>
                  {
                      this.state.categories.map(category => <Col key={category.category_name} lg={3}>
                          <br />
                          <h5><Link to={`/categories/${category.category_id}`}>{category.category_name} {category.category_number}</Link></h5>
                          {category.category_description}<br />

                              <br />
                      </Col>)
                  }
              </Row>



            <div class="paginationLinks">
            { this.state.pager.currentPage && this.state.pager.currentPage > 2 ?
              <span onClick={this.goToPage} page={1} >First</span>
            : "" }

            { this.state.pager.currentPage && this.state.pager.currentPage > 1 ?
                <span onClick={this.goToPage} page={this.state.pager.currentPage - 1} >Previous</span>
              : "" }

            { this.state.pager.pages ? this.state.pager.pages.map(page => <span>
              <span onClick={this.goToPage} page={page}  style={{textDecoration: this.state.pager.currentPage==page ? 'underline' : 'none'}}>{page}</span>
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


export default Categories;
