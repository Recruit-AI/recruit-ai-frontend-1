import React from 'react'
import axios from 'axios'
import api from '../../helpers/api'
import { Link } from 'react-router-dom'
const curr_user = localStorage.user ? JSON.parse(localStorage.user) : false
const headers = { headers: {'authorization': localStorage.token} }

class Page extends React.Component {
    constructor(props) {
        super(props)
        const params = new URLSearchParams(window.location.search)
        this.state = {
            athletes: [],
            params: params,
            update: true
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
            .get(api.apiPath(`/athletes`+ '?' + params.toString() ), headers)
            .then(res => { 
                this.setState({ athletes: res.data, params })
            })
            .catch(err => console.log(err));
    }

    render() {
        const athletes = this.state.athletes
        return <div className="tpBlackBg">
            <h1>Watched Athletes</h1>
            <hr />
            {athletes.map(
                (athlete) => <div>
                    <b>{athlete.preferred_name}- {athlete.high_school_name}</b><br />
                    {athlete.first_name} {athlete.last_name}, {athlete.city}, {athlete.state}<br />
                    {athlete.email} - {athlete.phone}<br />
                    <Link to={`/athletes/${athlete.athlete_id}`}>View</Link>
                    <Link to={`/athletes/${athlete.athlete_id}/edit`}>Update</Link>
                    <hr />
                </div>

            )}
            <Link to={`/athletes/new`}>Add New +</Link>
        </div>
    }
}

export default Page
