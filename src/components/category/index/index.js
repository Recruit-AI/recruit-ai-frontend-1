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
      this.setState({ sort: e.target.attributes.sortTerm.value, update:true })
    }

    handleChange = (e) => {
      this.setState({searchTerm: e.target.value, update:true})
    }

    sendSearch = (e) => {
      e.preventDefault()
    }


    render() {
        return <div className="container">
            Sort by:
            <button onClick={this.changeSort} sortTerm={"category_name"} >Alpha</button>
            <button onClick={this.changeSort} sortTerm={"category_number"} >Number</button>
            <button onClick={this.toggleSortDir}>{this.state.sortdir === "ASC" ? "Asc" : "Desc"}</button>
            <input type='text' onChange={this.handleChange} type="text"
              name="search" placeholder="Search"
              value={this.state.searchTerm} />

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


export default Categories;
