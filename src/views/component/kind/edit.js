import React from 'react';
import axios from 'axios';

import Kind from '../../../components/kind/page/page'
import HandleForm from '../../../components/forms/handler'

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
          .get(`http://localhost:4001/api/kinds/${id}`)
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
        <HandleForm item={formFields} formClass={"kinds"} />
      </div>
  }
}

export default KindPage;
