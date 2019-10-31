import React from 'react';

import Pantheons from '../../../components/pantheon/index/index'
import FormInsert from '../../../components/forms/handler'
import {defaultPantheon} from '../../../db/defaultObjects'
import {Link} from 'react-router-dom'
import {CSSTransition, SwitchTransition} from 'react-transition-group'

class Pantheon extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      showPantheonForm: false
    }
  }


  togglePantheonForm = () => {
    this.setState({showPantheonForm: !this.state.showPantheonForm})
  }

  render() {
    const curr_user = localStorage.user ?  JSON.parse(localStorage.user) : false
  return (
    <SwitchTransition><CSSTransition key={`pantheons`}
      in={true} timeout={350} classNames="whole-page" unmountOnExit appear enter exit><div className="">
      <div key='pantheons' className="pageCTA">
        <div className="container">
          <h4>List of all relgions, groups, and philosophies</h4>
          <h1>Pantheons</h1>
          <h5>All human thought is related to another. The Greeks came from the Macedonians, the Jewish people
            from the Ancient Babylonians, The Christians from both of those, and all three inspired many other forms of thought.</h5>
          <h3>All forms of thought & philosophy around the state & nature of humanity, the universe, and anything beyond can be better
            understood by looking at the forms of thought that inspired those civiliations</h3>
          <h6>We attempt to include all forms of schools and tribes but that will take time and effort. You can help us.</h6>

                        { curr_user ?  <Link to="/pantheons/new">+ Create New Pantheon</Link> : "" }
        </div>
      </div>
      <div className="divider"></div>
      <div className="pageDarkSection">
      <Pantheons />
      </div>
      <div className="reverse-divider"></div>

    </div></CSSTransition></SwitchTransition>
  );

  }
}

export default Pantheon;
