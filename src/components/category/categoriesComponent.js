import React from 'react'
import axios from 'axios'
import {Row, Col} from 'react-bootstrap'
import {Link} from 'react-router-dom'

class CategoriesComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          categories: []
        }
    }

    componentDidMount = () => {
      axios
          .get('http://localhost:4001/api/categories')
          .then(res =>
            this.setState({categories: res.data})
          )
          .catch(err => console.log(err) );
    }

    render() {
        return <Row>
            {
                this.state.categories.map(category => <Col key={category.category_name} lg={3}>
                    <br />
                    <h5><Link to={`/category/${category.category_id}`}>{category.category_name}</Link></h5>
                    {category.category_description}<br />
                    
                        <br />
                </Col>)
            }
        </Row>
    }
}

export default CategoriesComponent
