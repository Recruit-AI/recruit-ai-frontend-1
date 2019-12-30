import React from 'react'
import axios from 'axios'
import api from '../../helpers/api'
import {Link} from 'react-router-dom'

import HandleForm from '../forms/handler'

import defaults from  '../../db/defaultObjects'

const curr_user = localStorage.user ? JSON.parse(localStorage.user) : false
const headers = { headers: { 'authorization': localStorage.token } }

class Page extends React.Component {
    constructor(props) {
        super(props)
        const params = new URLSearchParams(window.location.search)
        this.state = {
            messages: [],
            message: {},
            params: params,
            filter: params.get('filter') || 'team'
        }
    }

    componentDidMount = async () => {
        this.loadPage()
        
    }

    componentWillReceiveProps = (newProps) => {
        this.loadPage(newProps)
    }

    loadPage = async (props = this.props) => {
        let params = this.state.params
       
        axios
            .get(api.apiPath(`/messages/${props.match.params.id}`+ '?' + params.toString() ), headers)
            .then(res =>{
                this.setState({ messages: res.data.pageOfItems })
                var objDiv = document.getElementById("messages-scroll-box");
                console.log(objDiv, objDiv.scrollTop, objDiv.scrollHeight)
                objDiv.scrollTop = objDiv.scrollHeight;
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
        

        
        return `${v[1]}/${v[2]}, ${hours}:${minutes} ${mm}`
    }

    updateInfo = (props = this.props) => {
        const id = props.match.params.id
        axios
            .get(api.apiPath(`/messages/${1}`), headers)
            .then(res => {
              this.setState({message: res.data.pageOfItems})
            })
            .catch(err => console.log(err) );
    }

    render() {
        const messages = this.state.messages.reverse()
        const item = this.state.message
        const formFields = defaults.defaultFullFields('message', item)

        return <div >
            {messages[0] ? <div>
                <h1>{messages[0].preferred_name}</h1>
            </div>: ""}
            
            <Link to={`/athletes/${this.props.match.params.id}`}>Back to Profile</Link>

            <div id="messages-scroll-box" style={{backgroundColor:'grey',maxHeight:'50vh',overflow:'scroll'}}>

            {messages.map(m => <div className="message" style={{backgroundColor: m.message_type === 'outgoing' ? 'lightblue' : 'white'}}>

                {m.message_text}
                <div className="m-date">{this.stringifyDate(m.created_at)}</div>
                {m.message_type === 'outgoing' ? m.user_display_name : ""}
                
            </div>)}

            </div>

            <HandleForm item={formFields} existing={false} formClass={"messages"} update={this.updateInfo} redirect={`/messages/${this.props.match.params.id}`} apiRoute={`/messages/send/${this.props.match.params.id}`} />

            

        </div>
    }
}

export default Page
