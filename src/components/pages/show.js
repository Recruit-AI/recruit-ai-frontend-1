import React from 'react'
import axios from 'axios'
import api from '../../helpers/api'

class Page extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            page: {}
        }
    }

    componentDidMount = () => {
        this.loadPage()
    }

    componentWillReceiveProps = (newProps) => {
        this.loadPage(newProps)
    }

    loadPage = (props = this.props) => {
        axios
            .get(api.apiPath(`/pages/${props.match.params.id}`))
            .then(res =>
              this.setState({page: res.data})
            )
            .catch(err => console.log(err) );
    }

    render() {
        const page = this.state.page
        return <div className="tpBlackBg">
          <p> {page.page_category} > </p>
          <h1>{page.page_title} <span className={`fas fa-${page.page_symbol}`}></span></h1>
          <div>
              {page.page_body_text}
          </div>
        </div>
    }
}

export default Page
