import React from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom';
import { Row, Col } from 'react-bootstrap'

import FormInsert from '../../forms/handler'
import {defaultKind} from '../../../db/defaultObjects'
import {CSSTransition, SwitchTransition} from 'react-transition-group'


const curr_user = localStorage.user ? JSON.parse(localStorage.user) : false

class CategoryPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            category: {},
            loading: false
        }
    }

    componentDidMount = () => { this.updatePage() }
    componentWillReceiveProps = (newProps) => { this.updatePage(newProps) }

    updatePage = (props = this.props) => {
        this.setState({loading: true})
        const id = props.match.params.id
        axios
            .get(`https://grimwire.herokuapp.com/api/categories/${id}`)
            .then(res =>
              this.setState({category: res.data, loading: false})
            )
            .catch(err => {
              console.log(err);
              this.setState({category: {}, loading: false})
            } );
    }

    render() {
        const item = this.state.category
        return typeof item !== 'undefined' && Object.keys(item).length > 0 && !this.state.loading ? <SwitchTransition><CSSTransition key={`categories-${this.props.match.params.id}`}
          in={true} timeout={350} classNames="whole-page" unmountOnExit><div>

            <Link to="/categories/">Back to All Categories</Link>
            { curr_user ?  <Link to="/categories/new">Create Category/Class</Link> : "" }

            <div className="category-info">
                <h1>{item.category_name} {item.category_number}</h1>
                  { curr_user ?  <Link to="/collections/new">Create New Collection/List</Link> : "" }
                  { curr_user ?  <Link to={`/categories/${this.props.match.params.id}/edit`}>Edit This Category</Link> : "" }

                <p>{item.category_description || "Please fill in."}</p>
            </div>

            <div className="category-list">
                <Row>
                    <Col lg={4}>
                        <img src={item.thumbnail ? item.thumbnail.image_url : ""}  alt={item.pantheon_name} width="250px"/>
                        <h4>Collections</h4>
                        { item.kinds ? item.kinds.map(i => <div><Link key={i.kind_id} to={`/collections/${i.kind_id}`}>{i.kind_name}</Link></div>) : ""}
                    </Col>
                    <Col lg={8}>
                        <h4>Overview & History</h4>
                        <p>{item.category_overview_text || "Please fill in."}</p>
                        <h4>Sources & Getting Started</h4>
                        <p>{item.category_sources_text || "Please fill in."}</p>
                    </Col>
                </Row>

            </div>



        </div></CSSTransition></SwitchTransition> : ( this.state.loading ?
          <div className="loader" style={{height:'60px',margin:'20px'}}><img className="loaderImg" src={require('../../../img/yyloader.gif')} /></div>
          : <div className="failedSearch">Sorry, there was an error. This page does not exist.</div>
      )
    }
}


export default CategoryPage;
