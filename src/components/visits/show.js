import React from 'react'
import axios from 'axios'
import api from '../../helpers/api'
import { Link } from 'react-router-dom'

const curr_user = localStorage.user ? JSON.parse(localStorage.user) : false
const headers = { headers: { 'authorization': localStorage.token } }

class Page extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visit: {}
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
            .get(api.apiPath(`/visits/${props.match.params.id}`), headers)
            .then(res =>
                this.setState({ visit: res.data })
            )
            .catch(err => console.log(err));
    }

    
    stringifyDate = (d) => {
        if(typeof d === 'string') { d = new Date(d) }

        const date = d,
        v = [
            date.getFullYear(),
            date.getMonth()+1,
            date.getDate(),
            date.getHours(),
            date.getMinutes(),
            date.getDay(),
            date.getTimezoneOffset()
        ];
        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        const hours = v[3] > 12 ? v[3] - 12 : v[3]
        const mm = v[3] > 12 ? "pm" : "am"
        const minutes = v[4] < 10 ? `0${v[4]}` : v[4]
        return `${days[v[5]]} ${v[1]}/${v[2]} @ ${hours}:${minutes} ${mm}`
    }

    confirmVisit = (e) => {
        axios.put( api.apiPath(`/visits/confirm/${this.props.match.params.id}`) , {}, headers)
            .then(res => this.setState({ visit: res.data.visit }) )
    }

    completeVisit = (e) => {
        axios.put(api.apiPath(`/visits/completed/${this.props.match.params.id}`), {}, headers)
            .then(res => this.setState({ visit: res.data.visit }) )
    }

    markMissed = (e) => {
        axios.put(api.apiPath(`/visits/missed/${this.props.match.params.id}`), {}, headers)
            .then(res => this.setState({ visit: res.data.visit }) )
    }

    deleteVisit = (e) => {
        if(window.confirm("Are you sure you wish to delete this record? There is no undo.")) {
        axios.delete(api.apiPath(`/visits/${this.props.match.params.id}`), headers)
            .then(res => {
                
                window.location.replace('/visits')
            })
        }
        
    }

    render() {
        const visit = this.state.visit

        return <div>
            <Link to="/visits">Back to All</Link> | 
            <Link to={`/visits/${visit.visit_id}/edit`}>Update</Link>
            <h3>Visit</h3>
            Athlete Link: <input value={`https://recruit-ai.netlify.com/visits/${visit.visit_id}/choose`} />
            <br /><i>Copy & Paste & send to athlete</i><br />

            Recruiter: {visit.user_display_name} <br />
            
            Athlete: {visit.preferred_name} <Link to={`/athletes/${visit.athlete_id}`}>See Profile</Link><br />
            STATUS: {visit.visit_status} <br />
            
            {visit.visit_status === 'chosen' ? 
            <span className="format-link" data-id={visit.vist_id} onClick={this.confirmVisit}>Confirm</span> 
            : "" } <br />

            {visit.visit_status === 'confirmed' ? 
            <span className="format-link" data-id={visit.vist_id} onClick={this.completeVisit}>Complete</span> 
            : ""}<br />

            {visit.visit_status === 'confirmed' ? 
            <span className="format-link" data-id={visit.vist_id} onClick={this.markMissed}>No Show</span> 
             : ""}<br />

            <span className="format-link" onClick={this.deleteVisit}>Delete Visit Record</span> 

            <h3>Time & Date</h3>
            {visit.time_options && !visit.chosen_time ? 
            <div>Time Options: { visit.time_options.map(t => <div>{this.stringifyDate(t)}</div>)}</div> : ""}<br />

            Chosen Time
            {visit.chosen_time ? <span>: {this.stringifyDate(visit.chosen_time)}</span> : " Still pending"}<br /><br />

            <h3>Instructions</h3>
            {visit.reporting_address || visit.visit_reporting_address}<br />
            {visit.reporting_instructions || visit.visit_reporting_instructions}<br />

        </div>
    }
}

export default Page
