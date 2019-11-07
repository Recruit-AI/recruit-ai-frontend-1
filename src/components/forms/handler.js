import React from 'react'
import axios from 'axios'
import {Form} from 'react-bootstrap'
import { withRouter } from "react-router-dom";


import ArrayField from './fieldTypes/array'
import IdListField from './fieldTypes/idList'
import IdSelectField from './fieldTypes/idSelect'
import ExtraInfoDefaultField from './fieldTypes/extraInfo'


const curr_user = localStorage.user ?  JSON.parse(localStorage.user) : false

class FormHandler extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      item: {},
      formClass: "",
      existing: (props.existing === true || props.existing === false) ? props.existing : (props.match.params.id ? true : false),
      default_extra_info: {},
      formColor: 'transparent',
      bulkAdd: this.props.bulkAdd || false,
      editId: props.editId || props.match.params.id
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

  handleChange = (e) => {
      this.setState({
          item: {
              ...this.state.item,
              [e.target.name]: e.target.value
          }
      })
  }

  handleCheck = (e) => {
      this.setState({
          item: {
              ...this.state.item,
              [e.target.name]: e.target.checked
          }
      })
  }

  handleChangeCb = (field, value) => {
      this.setState({
          item: {
              ...this.state.item,
              [field]: value
          }
      })
  }

  handleArrayChange = (field, array) => {
    this.setState({
          item: {
              ...this.state.item,
              [field]: array
          }
      })
  }

  handleInfoChange = (e) => {
      this.setState({
          item: {
              ...this.state.item,
              extra_info: {
                  ...this.state.item.extra_info,
                  [e.target.name]: e.target.value
              }
          }
      })
  }

  handleExtraInfoChange = (fieldsObject) => {
    this.setState({
        item: {
            ...this.state.item,
            default_extra_info: fieldsObject
        }
    })
  }

  submitForm = (e) => {
    this.setState({formColor:'white'})
    e.preventDefault();

    let item = this.state.item
    const headers = { headers: {'authorization': localStorage.token} }
    if(this.state.existing) {
      axios
          .put(`https://grimwire.herokuapp.com/api/${this.state.formClass}/${this.state.editId}`, item, headers)
          .then(res =>{
            this.setState({formColor:'green'})
            this.props.update()
            setTimeout( () => {this.setState({formColor:'transparent'})} , 250);
          })
          .catch(err => console.log(err) )
    } else {
      axios
          .post(`https://grimwire.herokuapp.com/api/${this.state.formClass}`, item, headers )
          .then(res => {
            this.setState({formColor:'green'})
            setTimeout( () => {this.setState({formColor:'transparent'})} , 250);
            if(!this.state.bulkAdd) {
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
                }
                const redirectPath = this.state.formClass === 'kinds' ? "collections" : this.state.formClass
                this.props.history.push(`/${redirectPath}/${redirectId}/edit`)
              }
          })
          .catch(err => console.log(err) )
    }


  }

  deleteItem = (e) => {
    e.preventDefault()
    if(window.confirm("Are you sure you wish to completely delete the item?")){
      axios
          .delete(`https://grimwire.herokuapp.com/api/${this.state.formClass}/${this.props.match.params.id}`)
          .then(res =>
            this.props.history.push(`/${this.state.formClass}`)
          )
          .catch(err => console.log(err) )
    }
  }

  printifyName = (name) => {
    return name
    .replace('pantheon_', '')
    .replace('kind_', '')
    .replace('category_', '')
    .replace('symbol_', '')
    .replace(/_/g, ' ').replace(/(?: |\b)(\w)/g, function(key) { return key.toUpperCase()})
  }

  toggleBulkAdd = (e) => {
    this.setState({bulkAdd: !this.state.bulkAdd})
  }

  render() {
    return curr_user ? <div>

    { this.state.existing ? "" : <div>BULK ADD <input onChange={this.toggleBulkAdd} type="checkbox" checked={this.state.bulkAdd} /></div> }

    <Form onSubmit={this.submitForm} className="handlerForm" style={{margin:'auto',backgroundColor:this.state.formColor}}>
      <h2 className="formHeader">{ this.state.existing ? `Edit` : "Add"}</h2>
      { Object.entries(this.state.item).map(itemField => <div key={itemField[0]} className="formField">

                {
                  typeof itemField[1] === 'string' &&  itemField[0].indexOf("_id") <= 0 && itemField[0] !== 'id' && itemField[0].indexOf('_text') === -1  ?
                          <Form.Group>
                    <Form.Label>{
                        this.printifyName(itemField[0])
                        }</Form.Label>
                    <Form.Control onChange={this.handleChange} type="text"
                    name={ itemField[0] } placeholder={ itemField[0] }
                    value={this.state.item[ itemField[0] ]} />
                    </Form.Group>
                  : ""
                }

                {
                  itemField[0].indexOf('_text') >= 0 ?
                  <Form.Group>
                    <Form.Label>{  this.printifyName(itemField[0]) }</Form.Label>
                    <Form.Control as="textarea" rows={5} onChange={this.handleChange} type="text"
                      name={ itemField[0] } placeholder={ itemField[0] }
                      value={this.state.item[ itemField[0] ]} />
                  </Form.Group>
                  : ""
                }

                {
                  !Array.isArray(itemField[1]) && itemField[0].indexOf("_id") > 0 ?
                  <IdSelectField item={this.state.item} field={itemField[0]} value={itemField[1]} handleChange={this.handleChangeCb}/>
                  : ""
                }

                {
                  Array.isArray(itemField[1]) && itemField[0].indexOf("_id") > 0 ?
                  <IdListField item={this.state.item} field={itemField[0]} array={itemField[1]} handleArrayChange={this.handleArrayChange}/>
                  : ""
                }

                {
                  Array.isArray(itemField[1]) && itemField[0].indexOf("_id") <= 0 ?
                  <ArrayField item={this.state.item} field={itemField[0]} array={itemField[1]} handleArrayChange={this.handleArrayChange}/>
                  : ""
                 }

                {
                  Number.isInteger(itemField[1]) && itemField[0].indexOf("_id") <= 0 ?
                  <Form.Group>
                  <Form.Label>{ this.printifyName(itemField[0]) }</Form.Label>
                  <Form.Control onChange={this.handleChange} type="number"
                  name={ itemField[0] } placeholder={ itemField[0] }
                  value={ this.state.item[ itemField[0] ] } />
                {itemField[0] === 'start_year' ? "Values greater than 0 are treated as AD, and negative values are treated as BCE." : ""}
                {itemField[0] === 'end_year' ? "Values greater than 0 are treated as AD, and negative values are treated as BCE. Enter '2100' exactly if the pantheon is still living." : ""}

                  </Form.Group>
                  : ""
                }

                {

                  typeof itemField[1] === 'boolean' && itemField[0].indexOf("_id") <= 0 ?
                  <Form.Group>
                  <Form.Label>{ this.printifyName(itemField[0]) }</Form.Label>

                  <Form.Control onChange={this.handleCheck} type="checkbox"
                  name={ itemField[0] } placeholder={ itemField[0] }
                  checked={this.state.item[ itemField[0] ]} />
                  </Form.Group>
                  : ""
                }

                {
                  itemField[0] === 'extra_info' ?
                    this.state.item.extra_info ?
                     <div>
                      { Object.entries(this.state.default_extra_info).map(i => <Form.Group key={i[0]} className="formField">
                          <Form.Label>{this.printifyName(i[0]) }</Form.Label>
                          <Form.Control
                              onChange={this.handleInfoChange}
                              name={i[0]} type="text" placeholder={i[0]}
                              value={this.state.item.extra_info[ i[0] ]} />
                      </Form.Group>) } </div>
                  : "" : ""
                }

                {
                  itemField[0] === 'default_extra_info' ?
                    <span>
                      <ExtraInfoDefaultField item={this.state.item} fieldsObject={itemField[1]} handleExtraInfoChange={this.handleExtraInfoChange} />
                    </span>
                : ""
                }



      </div>) }


    <button type='submit'>Save</button>
    <button onClick={this.deleteItem}>Delete</button>

    </Form> </div>: ""
  }


}

export default withRouter(FormHandler)
