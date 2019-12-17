import React from 'react'
import axios from 'axios'
import api from '../../helpers/api'
import { Link } from 'react-router-dom'
import { Form } from 'react-bootstrap'

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
            .put(api.apiPath(`/athletes/notes/${this.props.match.params.id}`), {notes: this.state.notes}, headers)
            .then(res => {
                this.setState({notes: ""})
                this.loadPage()
            })
            .catch(err => console.log(err));

    }

    handleNotes = (e) => {
        this.setState({ notes: e.target.value })
    }

    render() {
        const athlete = this.state.athlete


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
        console.log(process_steps, completed_steps)
        const application_percent = Number.parseInt((completed_steps / (process_steps * 1.0)) * 100)

        return Object.keys(athlete).length > 0 ? <div className="tpBlackBg">

            <b>{athlete.preferred_name}- {athlete.high_school_name}</b><br />
            {athlete.first_name} {athlete.last_name}, {athlete.city}, {athlete.state}<br />
            {athlete.email} - {athlete.phone}<br />
            Grade: {athlete.school_year}<br />
            Height: {athlete.height}<br />
            Weight: {athlete.weight}<br />
            <hr />
            <h4>Notes</h4>
            {athlete.notes.split(/\r?\n/).map(line => <div>{line}</div>) || "There are no notes for this athlete yet."}
            <Form onSubmit={this.updateNotes} style={{maxWidth:'800px', margin: 'auto'}}>
                <Form.Group>
                    <Form.Label>Add Notes</Form.Label>
                    <Form.Control type="text" as="textarea" rows={5} value={this.state.notes} onChange={this.handleNotes} />
                    <button type="submit">Add +</button>
                </Form.Group>
            </Form>
            <hr />
            <h4>Application Process: {application_percent}%</h4>
            {
                Object.entries(athlete.application_process)
                    .map(item => item[1] ?
                        <div><b>x {item[0]}</b></div> :
                        <div>o {item[0]}</div>
                    )
            }

            <Link to={`/athletes/${athlete.athlete_id}/edit`}>Update</Link>
        </div> : ""
    }
}

export default Page
