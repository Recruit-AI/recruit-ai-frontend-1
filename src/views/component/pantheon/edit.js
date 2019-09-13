import React from 'react';
import axios from 'axios';

import Pantheon from '../../../components/pantheon/page/page'
import HandleForm from '../../../components/forms/handler'

import {defaultPantheonKeys, defaultPantheon} from  '../../../db/defaultObjects'

class PantheonPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        pantheon: {}
    }
  }

  componentDidMount = () => { this.updateInfo(); }
  componentWillReceiveProps = (newProps) => {this.updateInfo(newProps);}

    updateInfo = (props = this.props) => {
      const id = props.match.params.id
      console.log(id)
      axios
          .get(`http://localhost:4001/api/pantheons/${id}`)
          .then(res =>
            this.setState({pantheon: res.data})
          )
          .catch(err => console.log(err) );
  }

  render() {
    const item = this.state.pantheon
    const formFields = {}
    Object.keys(defaultPantheon).forEach((key) => {
    if(defaultPantheonKeys.includes(key)) {
      formFields[key] = item[key] ? item[key] : defaultPantheon[key]
    }});


    return <div  className="tpBlackBg">
        <HandleForm item={formFields} formClass={"pantheons"} />
      </div>
  }
}

export default PantheonPage;
