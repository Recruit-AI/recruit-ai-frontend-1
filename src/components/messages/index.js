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
            messages: [],
            params: params,
            update: true,
            filter: params.get('filter') || 'team'
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
        let params = this.state.params
       
        this.setState({update: false})
        axios
            .get(api.apiPath(`/messages`+ '?' + params.toString() ), headers)
            .then(res => { 
                this.setState({ messages: res.data, params })
            })
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

    
    handleFilter = (e) => {
        const params = this.state.params
        params.set('filter', e.target.value)
        this.setState({order: e.target.value, params, update:true})
    }

    render() {
        const messages = this.state.messages
        return <div className="tpBlackBg">
            <h1>Messages</h1>
            <hr />
            {messages.map(message => <div>

                <Link to={`/messages/${message.athlete_id}`} style={{width:'100%'}}>
                <div style={{display:'flex',justifyContent:'space-between'}}>
                    <h3>{message.preferred_name} {message.last_name}</h3> 
                    <span>{message.user_display_name}</span>
                </div>
                </Link>

            </div>)}
        </div>
    }
}

export default Page
