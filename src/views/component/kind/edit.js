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
        kind: {}
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

  render() {
    const item = this.state.kind
    const formFields = {}
    Object.keys(defaultKind).forEach((key) => {
    if(defaultKindKeys.includes(key)) {
      formFields[key] = item[key] ? item[key] : defaultKind[key]
    }});

    return <div  className="tpBlackBg">

              <Link to={`/collections/${item.kind_id}`}>Back to Page</Link>

        <HandleForm item={formFields} formClass={"kinds"} update={this.updateInfo} />

        <RelationshipForm item={item} formClass={"thumbnail"} update={this.updateInfo} info={ {id: item.kind_id, class: "Kind"}  } />
        <RelationshipForm item={item} formClass={"images"} update={this.updateInfo} info={ {id: item.kind_id, class: "Kind"}  } />

        <RelationshipForm item={item} formClass={"kinds_used_by_pantheons"} update={this.updateInfo} />
      </div>
  }
}

export default KindPage;
