import React from 'react'
import axios from 'axios'
import {Form} from 'react-bootstrap'
import {Input} from 'reactstrap'
import { withRouter } from "react-router-dom";


import ArrayField from './fieldTypes/array'
import IdListField from './fieldTypes/idList'
import IdSelectField from './fieldTypes/idSelect'
import ExtraInfoDefaultField from './fieldTypes/extraInfo'


const curr_user = localStorage.user ? JSON.parse(localStorage.user) : false

class FormHandler extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      item: {},
      formClass: "",
      existing: props.existing,
      formColor: 'transparent',
      duplicateConnection: true,
    }
  }

  componentDidMount = () => { this.updateInfo(); }
  componentWillReceiveProps = (newProps) => {this.updateInfo(newProps);}

  updateInfo = (props = this.props) => {
    this.setState({item: props.item, formClass: props.formClass})
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

  handleFileChange = (e) => {
    if(e.target.files[0]){
    this.setState({
        item: {
            ...this.state.item,
            image_raw: e.target.files[0],
            image_preview_url: URL.createObjectURL(e.target.files[0])
        }
    })
    }
  }

  handleSelectIntChange = (e) => {
        this.setState({
            item: {
                ...this.state.item,
                [e.target.name]: Number.parseInt(e.target.value)
            }
        })
  }

  toggleDuplicate = (e) => {
    this.setState({duplicateConnection: !this.state.duplicateConnection})
  }


  submitForm = (e) => {

    this.setState({formColor:'white'})

    e.preventDefault();
    let item = this.state.item
    const id = this.state.item.id
    const headers = { headers: {'authorization': localStorage.token} }
    delete this.state.item.id

    if(this.state.formClass === "images" || this.state.formClass === "thumbnail"){
      const formId = `${this.state.formClass}-${id}`
      let myForm = document.getElementById(formId);
      let formData = new FormData(myForm);

      if(this.state.existing) {
        axios
            .put(`https://grimwire.herokuapp.com/api/${this.props.info.url}/${id}`, formData, headers )
            .then(res => {
              this.setState({formColor:'green'})
              this.props.update()
              setTimeout( () => {this.setState({formColor:'transparent'})} , 250);
            })
            .catch(err => console.log(err) )
      } else {
        axios
            .post(`https://grimwire.herokuapp.com/api/${this.props.info.url}`, formData, headers)
            .then(res =>{
              this.setState({formColor:'green'})
              this.props.update()
              setTimeout( () => {this.setState({formColor:'transparent'})} , 250);
            }
            )
            .catch(err => console.log(err) )
      }
    } else{
      if(this.state.existing) {
        axios
            .put(`https://grimwire.herokuapp.com/api/${this.props.info.url}/${id}`, item, headers )
            .then(res => {
              this.setState({formColor:'green'})
              this.props.update()
              setTimeout( () => {this.setState({formColor:'transparent'})} , 250);
            })
            .catch(err => console.log(err) )
      } else {
        if(this.state.formClass === 'symbol_connections') { item.duplicateConnection = this.state.duplicateConnection }
        axios
            .post(`https://grimwire.herokuapp.com/api/${this.props.info.url}`, item, headers)
            .then(res => {
              this.setState({formColor:'green'})
              this.props.update()
              setTimeout( () => {this.setState({formColor:'transparent'})} , 250);
            }
            )
            .catch(err => console.log(err) )
      }
    }

  }

  deleteItem = (e) => {
    e.preventDefault()
    const headers = { headers: {'authorization': localStorage.token} }
    if(window.confirm("Are you sure you wish to completely delete the item?")){
      axios
          .delete(`https://grimwire.herokuapp.com/api/${this.props.info.url}/${this.state.item.id}`, headers)
          .then(res =>
            this.setState({item: {}})
          )
          .catch(err => console.log(err) )
    }
  }

  printifyName = (name) => {
    return name.replace(/_/g, ' ').replace(/(?: |\b)(\w)/g, function(key) { return key.toUpperCase()})
  }

  render() {
    return curr_user && Object.entries(this.state.item).length > 0 ?
    <div style={{margin:'10px', width:'200px', backgroundColor:this.state.formColor}}>

      <Form onSubmit={this.submitForm} id={`${this.state.formClass}-${this.state.item.id}`} >

        <h5>{ this.state.existing ? `` : "Add New"}</h5>
        { Object.entries(this.state.item).map(itemField => <div key={itemField[0]}>



                {
                  //IF the value is a string, and the name of the field signifies it is not an id, a long text field, or a url
                  typeof itemField[1] === 'string' &&
                  itemField[0].indexOf("_id") < 0 &&
                  itemField[0] !== 'id' &&
                  itemField[0].indexOf('_text') === -1 &&
                  itemField[0].indexOf('_url') === -1 &&
                  itemField[0] !== "foreign_class" ?
                  <Form.Group>
                    <Form.Label>{ this.printifyName(itemField[0]) }</Form.Label>
                    <Form.Control onChange={this.handleChange} type="text"
                    name={ itemField[0] } placeholder={ itemField[0] }
                    value={this.state.item[ itemField[0] ]} />
                  </Form.Group>
                  : ""
                }

                {
                  itemField[0].indexOf('_text') >= 0 ?
                  <Form.Group>
                    <Form.Label>{ this.printifyName( itemField[0] ).replace('Text', '') }</Form.Label>
                    <Form.Control as="textarea" rows={5} onChange={this.handleChange} type="text"
                      name={ itemField[0] } placeholder={ itemField[0] }
                      value={this.state.item[ itemField[0] ]} />
                  </Form.Group>
                  : ""
                }

                {
                  !Array.isArray(itemField[1])
                  && itemField[0].indexOf("_id") > 0
                  && itemField[0].indexOf("foreign") === -1 ?
                  <IdSelectField item={this.state.item} field={itemField[0]} value={itemField[1]} handleChange={this.handleChangeCb}/>
                  : ""
                }

                {
                  Array.isArray(itemField[1]) && itemField[0].indexOf("_id") <= 0 ?
                  <ArrayField item={this.state.item} field={itemField[0]} array={itemField[1]} handleArrayChange={this.handleArrayChange}/>
                  : ""
                 }

                {
                  Number.isInteger(itemField[1]) && itemField[0].indexOf("_id")<= 0 && itemField[0] !== 'connection_relationship'  && itemField[0] !== "id" && itemField[0] !== "foreign_key"  ?
                  <Form.Group>
                  <Form.Label>{ this.printifyName(itemField[0]) }</Form.Label>
                  <Form.Control onChange={this.handleChange} type="number"
                  name={ itemField[0] } placeholder={ itemField[0] }
                  value={this.state.item[ itemField[0] ]} />
                  </Form.Group>
                  : ""
                }
                {

                  typeof itemField[1] === 'boolean' ?
                  <Form.Group>
                  <Form.Label>{this.printifyName(itemField[0])}</Form.Label>

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
                      <h5>Collection Related Information</h5>
                      { Object.entries(this.state.item.extra_info).map(i => <Form.Group key={i[0]}>
                          <Form.Label>{this.printifyName(i[0])}</Form.Label>
                          <Form.Control
                              onChange={this.handleInfoChange}
                              name={i[0]} type="text" placeholder={i[0]}
                              value={i[1]} />
                      </Form.Group>) } </div>
                  : "" : ""
                }

                {
                  itemField[0] === 'default_extra_info' ?
                    <span>
                      {JSON.stringify(itemField[1])}
                      <ExtraInfoDefaultField item={this.state.item} fieldsObject={itemField[1]} handleExtraInfoChange={this.handleExtraInfoChange} />
                    </span>
                : ""
                }

                {
                  itemField[0] === 'connection_relationship' ?
                    <span>
                      <Form.Label>Type of Connection</Form.Label>
                      <Form.Control as="select" value={itemField[1]} name={itemField[0]} onChange={this.handleSelectIntChange}>
                        <option value="-1">-please select-</option>
                        {
                          ['Source', 'Mention', 'Related', 'Association', 'Property', 'Alternate Form', 'Type', 'Item'].map((option, i) =>
                            <option key={option} value={ i } >
                              {option}
                            </option>)
                        }
                      </Form.Control>
                    </span>
                : ""
                }

                {
                  itemField[0] === 'image_url' ?

                    <Form.Group>
                          <img src={this.state.item.image_preview_url ? this.state.item.image_preview_url : itemField[1] } height="50px" alt={this.state.item.image_title} /><br />
                          <Form.Label>Image</Form.Label>
                          <Input type="file" name={'image_raw'} onChange={this.handleFileChange} />
                    </Form.Group>
                  : ""
                }

                { itemField[0] === 'foreign_id' ? <Input type="hidden" name="foreign_id" value={this.state.item.foreign_id} /> : "" }
                { itemField[0] === 'foreign_key' ? <Input type="hidden" name="foreign_key" value={this.state.item.foreign_key} /> : "" }
                { itemField[0] === 'foreign_class' ? <Input type="hidden" name="foreign_class" value={this.state.item.foreign_class} /> :""}





      </div>) }

      {
        this.state.formClass==='symbol_connections' && !this.state.existing ? <Form.Group>
        <Form.Label>Dual Connection?</Form.Label>
        <Form.Control onChange={this.toggleDuplicate} type="checkbox" checked={this.state.duplicateConnection} />
        </Form.Group>
        : ""

      }

    <button type='submit'>{ this.state.existing ? `Edit` : "Add"}</button>
    <button onClick={this.deleteItem}>Delete</button>

    </Form></div> : ""
}


}

export default withRouter(FormHandler)
