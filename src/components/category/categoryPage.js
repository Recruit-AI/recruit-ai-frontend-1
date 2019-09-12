import React from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom';
import { Row, Col } from 'react-bootstrap'

import FormInsert from '../forms/insert'
import {defaultKind} from '../../db/defaultObjects'

class CategoryPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            category: {}
        }
    }

    componentDidMount = () => { this.updatePage() }
    componentWillReceiveProps = (newProps) => { this.updatePage(newProps) }

    updatePage = (props = this.props) => {
        const id = props.match.params.id
        axios
            .get(`http://localhost:4001/api/categories/${id}`)
            .then(res =>
              this.setState({category: res.data})
            )
            .catch(err => console.log(err) );
    }

    render() {
        const item = this.state.category
        return typeof item !== 'undefined' && Object.keys(item).length > 0 ? <div>

            <div className="category-info">
                <h1>{item.category_name} {item.category_number}</h1>
                <p>{item.category_description}</p>
            </div>

            <div className="category-list">
                <Row>
                    <Col lg={8}>
                        <h4>Overview & History</h4>
                        <p>{item.category_overview}</p>
                        <h4>Sources & Getting Started</h4>
                        <p>{item.sourcesText}</p>
                    </Col>
                    <Col lg={4}>
                        <h4>Collections</h4>
                        { item.kinds ? item.kinds.map(i => <Link key={i.kind_id} to={`/collection/${i.kind_id}`}>{i.kind_name}</Link>) : ""}
                    </Col>
                </Row>

            </div>

                        <Row className="forms">
                            <Col className=""><FormInsert item={item} key={item.name} formClass={"categories"} /></Col>
                            <Col className=""><FormInsert item={defaultKind} formClass={"kinds"} /></Col>
                        </Row>


        </div> : "Loading or not found"

    }
}


export default CategoryPage;
