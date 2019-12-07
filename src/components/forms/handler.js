import React from 'react'
import axios from 'axios'
import BuildForm from './buildForm'
import { withRouter } from "react-router-dom";


const curr_user = localStorage.user ?  JSON.parse(localStorage.user) : false

class FormHandler extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      item: {},
      formClass: "",
      existing: (props.existing === true || props.existing === false) ? props.existing : (props.match.params.id ? true : false),
      editId: props.editId || props.match.params.id,
      default_extra_info: {}
    }
  }

  componentDidMount = () => { this.updateInfo(); }
  componentWillReceiveProps = (newProps) => {this.updateInfo(newProps);}

  updateInfo = (props = this.props) => {
    this.setState({item: props.item, formClass: props.formClass})
    if(props.item.extra_info) {
      axios
          .get(`https://grimwire.herokuapp.com/api/kinds/${props.item.symbol_kind_id}`)
          .then(res => {
            if(res.data.kind_id){
              this.setState({default_extra_info: res.data.default_extra_info})
            }
          })
          .catch(err => console.log(err) )
    }
  }

  
  //UPDATE ITEM is a wrapper function passed as a callback to update this state
  updateItem = (item) => { this.setState({item}) }

    //A helper function that sets up & actually makes the api call with headers, etc.
    updateAPI = async (method, url, payload, bulkAdd) => {
      const headers = { headers: {'authorization': localStorage.token} }
      var apiCall;
  
      if(method === 'put') {
        apiCall = await axios.put(url, payload, headers)
      } else {
        apiCall = await axios.post(url, payload, headers)
      }
      if(!bulkAdd) { await this.props.update() }
      return apiCall
    }
  

  submitForm = async (bulkAdd = false) => {
    let item = this.state.item
    
    const postURL = `https://grimwire.herokuapp.com/api/${this.state.formClass}`
    const putURL = `${postURL}/${this.state.editId}`

    var apiCall, redirect;

    if(this.state.existing) {
      apiCall = await this.updateAPI('put', putURL, item, bulkAdd)
      redirect = null
    } else {
      apiCall = await this.updateAPI('post', postURL, item, bulkAdd)
      redirect = this.redirectEditPath(apiCall)
    }

    return {apiCall, redirect}
  }

  deleteItem = (e) => {
    e.preventDefault()
    const headers = { headers: {'authorization': localStorage.token} }
    if(window.confirm("Are you sure you wish to completely delete the item?")){
      axios
          .delete(`https://grimwire.herokuapp.com/api/${this.state.formClass}/${this.props.match.params.id}`, headers)
          .then(res =>
            this.props.history.push(`/${ this.state.formClass === 'kinds' ? "collections" : this.state.formClass}`)
          )
          .catch(err => console.log(err) )
    }
  }


  render() {
    const show = curr_user
    return show ?
      <div className='full-form'>
        <BuildForm 
          item={this.state.item} 
          updateItem={this.updateItem} 
          submitForm={this.submitForm} 
          deleteItem={this.deleteItem}
          existing={this.state.existing} 
          formClass={this.state.formClass} /> 
      </div>
    : ""
  }

  redirectEditPath = (res) => {
    let redirectId = 0;

    switch(this.state.formClass){
      case('kinds'):
        redirectId = res.data.kind_id
        break;
      case('pantheons'):
        redirectId = res.data.pantheon_id
        break;
      case('symbols'):
        redirectId = res.data.symbol_id
        break;
      case('categories'):
        redirectId = res.data.category_id
        break;
       case('resources'):
        redirectId = res.data.resource_id
        break;
      }

      const redirectPath = this.state.formClass === 'kinds' ? "collections" : this.state.formClass
      return `/${redirectPath}/${redirectId}/edit`

  }


}

export default withRouter(FormHandler)
