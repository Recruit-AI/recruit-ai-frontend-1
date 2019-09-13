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

  render() {
    const {item, fieldsObject} = this.props
    return <div>
    <Form.Group>
        <Form.Label>Extra Information Fields</Form.Label>
        {
          Object.entries(fieldsObject).map(name => <div><span id={name[0]} onClick={this.deleteField}> {name} (-)</span></div>)
        }
        <Form.Control type="text" onChange={this.handleChange} value={this.state.currentWord}/> <span onClick={this.addField}>Add Field (+)</span>
    </Form.Group>
    </div>
  }

}

export default ArrayField
