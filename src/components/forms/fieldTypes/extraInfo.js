import React from 'react'
import {Form} from 'react-bootstrap'

class ArrayField extends React.Component {
  constructor(props) {
      super(props)
      this.state = {
        currentWord: ""
      }
  }

  deleteField = (e) => {
    console.log(e.target.id)
    var oldObject = this.props.item.default_extra_info
    delete oldObject[e.target.id]
    this.props.handleExtraInfoChange(oldObject)
  }

  addField = (e) => {
    var oldObject = this.props.item.default_extra_info
    oldObject[this.state.currentWord] = ""
    this.props.handleExtraInfoChange(oldObject)
  }

  handleChange = (e) => {
    this.setState({currentWord: e.target.value})
  }
  printifyName = (name) => {
    return name.replace(/_/g, ' ').replace(/(?: |\b)(\w)/g, function(key) { return key.toUpperCase()})
  }

  render() {
    const {item, fieldsObject} = this.props
    return <div>
    <Form.Group>
        <Form.Label>Extra Information Fields For Symbols</Form.Label>
        <Form.Control type="text" onChange={this.handleChange} value={this.state.currentWord}/> <span onClick={this.addField}>Add (+)</span><br />
        <p>Warning: You cannot change the name of a field once it is set and data is filled in. You can only delete the existing field and data and create a new one. Please choose careully.</p>
        <Form.Label>Edit:</Form.Label>
        {
          Object.entries(fieldsObject).map(name => <div>{ this.printifyName(name[0]) } <span id={name[0]} onClick={this.deleteField}> (-delete)</span></div>)
        }
        <br />
    </Form.Group>
    </div>
  }

}

export default ArrayField
