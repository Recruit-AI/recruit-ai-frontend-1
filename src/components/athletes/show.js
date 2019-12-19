import React from 'react'
import axios from 'axios'
import api from '../../helpers/api'
import { Link } from 'react-router-dom'
import { Form } from 'react-bootstrap'
import defaults from  '../../db/defaultObjects'
import HandleForm from '../forms/handler'

const curr_user = localStorage.user ? JSON.parse(localStorage.user) : false
const headers = { headers: { 'authorization': localStorage.token } }


class Page extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            athlete: {},
            notes: ""
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
            .get(api.apiPath(`/athletes/${props.match.params.id}`), headers)
            .then(res =>
                this.setState({ athlete: res.data })
            )
            .catch(err => console.log(err));
    }

    updateNotes = (e) => {
        e.preventDefault();
        axios
            .put(api.apiPath(`/athletes/notes/${this.props.match.params.id}`), { notes: this.state.notes }, headers)
            .then(res => {
                this.setState({ notes: "" })
                this.loadPage()
            })
            .catch(err => console.log(err));

    }

    handleNotes = (e) => {
        this.setState({ notes: e.target.value })
    }

    deleteAthlete = (e) => {
        if(window.confirm("Are you sure you wish to delete this record? There is no undo.")) {
        axios.delete(api.apiPath(`/athletes/${this.props.match.params.id}`), headers)
            .then(res => {
                
                window.location.replace('/athletes')
            })
        }
        
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

    render() {
        const athlete = this.state.athlete
        let formFields = defaults.defaultFullFields('visit', {})
        formFields = {
            ...formFields, 
            visit_team_id: athlete.team_id, 
            visit_athlete_id: athlete.athlete_id,
            visit_personnel_id: curr_user.user_id
        }

        console.log(formFields)

        let process_steps = 1;
        let completed_steps = 0;
        if (athlete.application_process) {
            process_steps = Object.keys(athlete.application_process).length
            Object.entries(athlete.application_process)
                .map(item => item[1] ?
                    completed_steps++ :
                    false
                )
        }
        
        const application_percent = Number.parseInt((completed_steps / (process_steps * 1.0)) * 100)

        return Object.keys(athlete).length > 0 ? <div className="tpBlackBg">


            <Link to={`/athletes/${athlete.athlete_id}/edit`}>Update</Link> | <Link to={`/athletes`}>Back to All</Link><br />
             | 
            <span className="format-link" onClick={this.deleteAthlete}>Delete Athlete Record</span> 

            <h3>School Visits</h3> 
            {athlete.visits.map((visit, i) => <div>
                {visit.visit_status.toUpperCase()} - {visit.chosen_time ? this.stringifyDate(visit.chosen_time) : ""}
                <Link to={`/visits/${visit.visit_id}`}>View Details</Link>

            </div>)}

            <h1>{athlete.preferred_name}- {athlete.high_school_name}</h1>
            {athlete.first_name} {athlete.last_name}, {athlete.city}, {athlete.state}<br />
            {athlete.email} - {athlete.phone}<br />
            Grade: {athlete.school_year}<br />
            Height: {athlete.height}<br />
            Weight: {athlete.weight}<br />
            <hr />
            Recruiter: {athlete.user_display_name}
            <hr />
            <h4>Notes</h4>
            {athlete.notes ? athlete.notes.split(/\r?\n/).map(line => <div>{line}</div>) : "There are no notes for this athlete yet."}
            <Form onSubmit={this.updateNotes} style={{ maxWidth: '800px', margin: 'auto' }}>
                <Form.Group>
                    <Form.Label>Add Notes</Form.Label>
                    <Form.Control type="text" as="textarea" rows={5} value={this.state.notes} onChange={this.handleNotes} />
                    <button type="submit">Add +</button>
                </Form.Group>
            </Form>
            <hr />
            {athlete.application_process ? <div>
            <h4>Application Process: {application_percent}%</h4>
            {
                Object.entries(athlete.application_process)
                    .map(item => item[1] ?
                        <div><b>x {item[0]}</b></div> :
                        <div>o {item[0]}</div>
                    )
            } </div>: <div>Please <Link to={`/athletes/${athlete.athlete_id}/edit`}>Edit this Record</Link> to add the application process.</div> }
            <hr />
            <h4>Schedule Visit</h4>
            <HandleForm existing={false} item={formFields} formClass={"visits"} update={this.loadPage} redirect={`/athletes/${athlete.athlete_id}`}/>
        </div> : ""
    }
}

export default Page
