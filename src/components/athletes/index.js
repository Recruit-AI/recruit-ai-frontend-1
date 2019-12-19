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
            update: true,
            sort: params.get('sort') || "preferred_name",
            order: params.get('order') || "asc",
            filter: params.get('filter') || "team"
        }
    }

    componentDidMount = () => {
        this.loadPage()
    }

    componentDidUpdate = (pProps, pState) => {
        if(this.state.update) {
            this.loadPage()
        }
    }

    loadPage = (props = this.props) => {
        let params=this.state.params
        this.setState({update: false})
        axios
            .get(api.apiPath(`/athletes`+ '?' + params.toString() ), headers)
            .then(res => { 
                this.setState({ athletes: res.data, params, update: false })
            })
            .catch(err => console.log(err));
    }

    handleSort = (e) => {
        const params = this.state.params
        params.set('sort', e.target.value)
        this.setState({sort: e.target.value, params, update:true})
    }
    handleOrder = (e) => {
        const params = this.state.params
        params.set('order', e.target.value)
        this.setState({order: e.target.value, params, update:true})
    }
    handleFilter = (e) => {
        const params = this.state.params
        params.set('filter', e.target.value)
        this.setState({order: e.target.value, params, update:true})
    }

    render() {
        const athletes = this.state.athletes
        return <div className="tpBlackBg">
            <h1>Athletes</h1>
            <select onChange={this.handleSort}>
                <option value="preferred_name">Display Name</option>
                <option value="last_name">Last Name</option>
                <option value="school_year">Grade</option>
                <option value="city">City</option>
                <option value="state">State</option>
                <option value="height">Height</option>
                <option value="weight">Weight</option>
            </select>
            <select onChange={this.handleOrder}>
                <option value="asc">Low (A) - High (Z)</option>
                <option value="desc">High (Z) - Low (A)</option>
            </select>
            <select onChange={this.handleFilter}>
                <option value="team">Team</option>
                <option value="personal">Personal</option>
            </select>
            <hr />
            {athletes.map(
                (athlete) => <div>
                    <b>{athlete.preferred_name}</b> ({athlete.first_name} {athlete.last_name}); {athlete.school_year} at {athlete.high_school_name} ({athlete.city}, {athlete.state});  
                    <br />  {Number.parseInt(athlete.height/12)}'{athlete.height%12}", {athlete.weight}lbs; {athlete.email} / {athlete.phone} /
                    <Link to={`/athletes/${athlete.athlete_id}`}>View</Link> /
                    <Link to={`/athletes/${athlete.athlete_id}/edit`}>Update</Link>
                    <hr />
                </div>

            )}
            <Link to={`/athletes/new`}>Add New +</Link>
        </div>
    }
}

export default Page
