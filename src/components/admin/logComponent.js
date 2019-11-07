import React from 'react'
import axios from 'axios'

import LogCard from './userLogs/logCard'


const curr_user = localStorage.user ?  JSON.parse(localStorage.user) : false
const headers = { headers: {'authorization': localStorage.token} }

class Page extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            logs: [],
            filter: "unconfirmed",
            lastFilter: ""
        }
    }

    componentDidMount = () => {
      this.loadPage();
    }

    componentDidUpdate = () => {
      if(this.state.filter !== this.state.lastFilter) {
        this.loadPage();
      }
    }

    loadPage = () => {
      axios
          .get(`https://grimwire.herokuapp.com/api/logs/${this.state.filter}`, headers)
          .then(res =>
            this.setState({logs: res.data, lastFilter: this.state.filter})
          )
          .catch(err => console.log(err) );
    }

    toggleFilter = () => {
      this.setState({filter: this.state.filter === 'unconfirmed' ? 'all' : 'unconfirmed'})
    }

    render() {
        return <div>
          <h2>{this.state.filter === 'unconfirmed' ? 'Unconfirmed Logs' : 'All Logs'}</h2>
          <span onClick={this.toggleFilter}>See {this.state.filter === 'unconfirmed' ? 'All Logs' : 'Only Unconfirmed Logs'}</span><br />
          {
            this.state.logs.length > 0 ?
            this.state.logs.map(log => <div>
                <LogCard logItem={log} update={this.loadPage}/><hr />
              </div>
            )
            : <div>{this.state.filter === this.state.lastFilter ? "No results." : "Loading."}</div>
          }
        </div>
    }
}

export default Page
