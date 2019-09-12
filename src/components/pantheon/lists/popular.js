import React from 'react'
import SmallPantheonCard from '../cards/small'
import axios from 'axios';

//This component is used to build a 'complete' list, used for calling searches and passing props to the actual list component.

class PopularPantheonList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          pantheons: []
        }
    }

    componentDidMount = () => {
      axios
          .get('http://localhost:4001/api/pantheons')
          .then(res =>
            this.setState({pantheons: res.data})
          )
          .catch(err => console.log(err) );
    }

    render() {
      const style = {
          display: "flex",
          justifyContent: 'center',
          overflow: "hidden"
      }

      return <div>
        <h3>Popular</h3>
        <div style={style}>
          { this.state.pantheons.splice(1, 12).map(item =>
            <SmallPantheonCard key={item.pantheon_name} pantheon={item} />
          )}
        </div>
      </div>
    }
}

export default PopularPantheonList
