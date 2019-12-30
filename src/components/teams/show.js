import React from 'react'
import axios from 'axios'
import api from '../../helpers/api'
import {Link} from 'react-router-dom'
import JoinRequests from './requests'

const curr_user = localStorage.user ? JSON.parse(localStorage.user) : false
const headers = { headers: {'authorization': localStorage.token} }

class Page extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            team: {},
            requests: []
        }
    }

    componentDidMount = () => {
        this.loadPage()
    }

    componentWillReceiveProps = (newProps) => {
        this.loadPage(newProps)
    }

    loadPage = (props = this.props) => {
        axios
            .get(api.apiPath(`/teams/${props.match.params.id}`))
            .then(res =>
              this.setState({team: res.data})
            )
            .catch(err => console.log(err) );
    }

    
    declineJoin = (e) => {
        axios
            .get(api.apiPath(`/teams/decline/${e.target.getAttribute('data-id')}`), headers)
            .then(res => { 
                this.loadPage();
            })
            .catch(err => console.log(err));
    }

    render() {
        const team = this.state.team
        const owned = team.account_moderator_id === curr_user.user_id 

        return <div>
            <h3>Team</h3>
            <h1>{team.team_name}</h1>
            <h2>Staff</h2>
            {team.teamMembers ? team.teamMembers.map(s => <div>
                {s.user_display_name}
                {s.foreign_user_id !== curr_user.user_id && owned ? 
                <span className="format-link" onClick={this.declineJoin} data-id={s.foreign_user_id}>Remove From Team</span>
                : ""}
                </div>) : ""}
            <h3>Admissions Email</h3>
            {team.admissions_email_address}
            <h3>Visit Address</h3>
            {team.visit_reporting_address}
            <h3>Visit Instructions</h3>
            {team.visit_reporting_instructions}<br />


            { owned ? <Link to={`/teams/${team.team_id}/edit`}>Edit Team Details</Link> : "" }

            { owned ? <JoinRequests loadPage={this.loadPage} /> : "" } 
        </div>
    }
}

export default Page
