import React from 'react';

import Kinds from '../../../components/kind/index/index'
import FormInsert from '../../../components/forms/handler'
import {defaultKind} from '../../../db/defaultObjects'

class Kind extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
    }
  }


  render() {
  return (
    <div className="">
      <div className="pageCTA">
        <div className="container">
          <h4>Tarot Cards, Astrology Signs, Planetary Energies, Crystals</h4>
          <h1>Collections</h1>
          <h5>For a starting seeker, there are so many things to memorize and learn.</h5>
          <h3>It seems like everyone has their own way of categorizing & understanding nature & the universe, certains lists and things they pay attention to.</h3>
          <h6>These are those lists.</h6>

        </div>
      </div>
      <div className="divider"></div>
      <div className="pageDarkSection">
      <Kinds />
      </div>
      <div className="reverse-divider"></div>

    </div>
  );

  }
}

export default Kind;
