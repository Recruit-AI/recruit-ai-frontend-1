import React from 'react'
import axios from 'axios'
import api from '../../helpers/api'
import { Link } from 'react-router-dom'

const curr_user = localStorage.user ?  JSON.parse(localStorage.user) : false
const headers = { headers: {'authorization': localStorage.token} }

class Page extends React.Component {
    constructor(props) {
        super(props)
        const params = new URLSearchParams(window.location.search)
        this.state = {
            teams: [],
            params: params,
            update: true,
            formColor: 'transparent'
        }
    }

    componentDidMount = () => {
        this.loadPage()
    }

    componentDidUpdate = (pProps, pState) => {
        
        const differentPages = this.state.params.toString() !== new URLSearchParams(window.location.search).toString()
        const changingUpdate = pState.update !== this.state.update

        if(this.state.update || (differentPages && !changingUpdate)) {
            this.loadPage()
        }
    }

    loadPage = (props = this.props) => {
        let params = this.state.params
        if(params.toString() !== new URLSearchParams(window.location.search)) {
            params = new URLSearchParams(window.location.search)
        }
        if(this.state.update){this.setState({update: false})}
        axios
            .get(api.apiPath(`/teams`+ '?' + params.toString() ))
            .then(res => { 
                this.setState({ teams: res.data, params })
            })
            .catch(err => console.log(err));
    }

    requestJoin = (e) => {
        axios
            .get(api.apiPath(`/teams/join/${e.target.getAttribute('data-id')}`), headers)
            .then(res => { 
                this.setState({ formColor: "rgba(0,200,0,.4)", user: res.data })
                setTimeout(() => { this.setState({ formColor: "transparent" }) }, 500)
                
            })
            .catch(err => console.log(err));
    }

    render() {
        const teams = this.state.teams
        return <div className="tpBlackBg" style={{backgroundColor:this.state.formColor}}>
            <h1>Team Search</h1>
            <hr />
            {teams.map(
                (team) => <div>
                    <h3>{team.team_name}</h3>
                    <span className="format-link" onClick={this.requestJoin} data-id={team.team_id}>Request to Join</span>
                    <hr />
                </div>

            )}
            <Link to={`/teams/new`}>Add New +</Link>
        </div>
    }
}

export default Page
