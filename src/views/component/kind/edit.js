import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'

import Kind from '../../../components/kind/page/page'
import HandleForm from '../../../components/forms/handler'
import RelationshipForm from '../../../components/forms/relationship'

import {defaultKindKeys, defaultKind} from  '../../../db/defaultObjects'

class KindPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        kind: {},
        page: 0
    }
  }

  componentDidMount = () => { this.updateInfo(); }
  componentWillReceiveProps = (newProps) => {this.updateInfo(newProps);}

    updateInfo = (props = this.props) => {
      const id = props.match.params.id
      console.log(id)
      axios
          .get(`https://grimwire.herokuapp.com/api/kinds/${id}`)
          .then(res =>
            this.setState({kind: res.data})
          )
          .catch(err => console.log(err) );
  }

  changePage = (e) => {
    this.setState({page: Number.parseInt(e.target.getAttribute('data-page'))})
  }


  render() {
    const item = this.state.kind
    const formFields = {}
    Object.keys(defaultKind).forEach((key) => {
    if(defaultKindKeys.includes(key)) {
      formFields[key] = item[key] ? item[key] : defaultKind[key]
    }});

        const page = this.state.page
        const pages = ["Main", "Thumbnail Image", "Image Gallery", "Used By Pantheons", "Sources", "Symbol Connection", "Info Connections"]
    return <div  className="tpBlackBg">

              <Link to={`/collections/${item.kind_id}`}>Back to Page</Link>

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

        <HandleForm item={formFields} formClass={"kinds"} update={this.updateInfo} />

          : ""
          }
          {
          page === 1 ?

        <RelationshipForm item={item} formClass={"thumbnail"} update={this.updateInfo} info={ {id: item.kind_id, class: "Kind"}  } />
        : ""
    }
    {
      page === 2 ?

        <RelationshipForm item={item} formClass={"images"} update={this.updateInfo} info={ {id: item.kind_id, class: "Kind"}  } />
        : ""
    }
    {
      page === 3 ?


        <RelationshipForm item={item} formClass={"kinds_used_by_pantheons"} update={this.updateInfo} />
        : ""
    }
    {
      page === 4 ?
        <RelationshipForm item={item} formClass={"sources"} update={this.updateInfo}  info={ {id: item.kind_id, class: "Kind"}  } />
        : ""
    }
    {
      page === 5 ?
        <RelationshipForm item={item} formClass={"kind_symbol_connections"} update={this.updateInfo} />
        : ""
    }
    {
      page === 6 ?
        <RelationshipForm item={item} formClass={"kind_info_kinds"} update={this.updateInfo}   />
        : ""
    }
      </div>
  }
}

export default KindPage;
