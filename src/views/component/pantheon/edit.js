import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'

import Pantheon from '../../../components/pantheon/page/page'
import HandleForm from '../../../components/forms/handler'
import RelationshipForm from '../../../components/forms/relationship'

import {defaultPantheonKeys, defaultPantheon} from  '../../../db/defaultObjects'

class PantheonPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        pantheon: {},
        page: 0
    }
  }

  componentDidMount = () => { this.updateInfo(); }
  componentWillReceiveProps = (newProps) => {this.updateInfo(newProps);}


  updateInfo = (props = this.props) => {
      const id = props.match.params.id
      console.log(id)
      axios
          .get(`https://grimwire.herokuapp.com/api/pantheons/${id}`)
          .then(res =>
            this.setState({pantheon: res.data})
          )
          .catch(err => console.log(err) );
  }

  changePage = (e) => {
    this.setState({page: Number.parseInt(e.target.getAttribute('data-page'))})
  }

  render() {
    const item = this.state.pantheon
    const formFields = {}
    Object.keys(defaultPantheon).forEach((key) => {
    if(defaultPantheonKeys.includes(key)) {
      formFields[key] = item[key] ? item[key] : defaultPantheon[key]
    }});

    const page = this.state.page
    const pages = ["Main", "Thumbnail Image", "Image Gallery", "History", "Inspired", "Collections"]
    return <div  className="tpBlackBg">

        <Link to={`/pantheons/${item.pantheon_id}`}>Back to Page</Link>

        <div>
                  {
                    pages.map(option =>
                      <span className={`page-button ${pages.indexOf(option) == page ? "page-button-active" : ""}`} onClick={this.changePage} data-page={pages.indexOf(option)}>
                        {option}
                      </span>)

                  }
        </div>

        {
          page === 0 ?
            <HandleForm item={formFields} formClass={"pantheons"} update={this.updateInfo} />
            : ""
        }
        {
          page === 1 ?
            <RelationshipForm item={item} formClass={"thumbnail"} update={this.updateInfo} info={ {id: item.pantheon_id, class: "Pantheon"}  } />
            : ""
        }
        {
          page === 2 ?
            <RelationshipForm item={item} formClass={"images"} update={this.updateInfo} info={ {id: item.pantheon_id, class: "Pantheon"}  } />
            : ""
        }
        {
          page === 3 ?
            <RelationshipForm item={item} formClass={"pantheons_history"} update={this.updateInfo} />
            : ""
        }
        {
          page === 4 ?
            <RelationshipForm item={item} formClass={"pantheons_influenced"} update={this.updateInfo} />
            : ""
        }
        {
          page === 5 ?
            <RelationshipForm item={item} formClass={"pantheons_use_kinds"} update={this.updateInfo} />
            : ""
        }


      </div>
  }
}

export default PantheonPage;
