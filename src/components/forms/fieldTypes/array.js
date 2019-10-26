import React from 'react'
import {Form} from 'react-bootstrap'

class ArrayField extends React.Component {
  constructor(props) {
      super(props)
      this.state = {

      }
  }

  handleArrayChange = (e) => {
    const set = e.target.name.split('-')
    const field = set[0]
    const index = set[1]
    const value = e.target.value
    const array = this.props.item[field]
    if(value === "") {
      array.splice(index, 1)
    } else if(value.indexOf(';') > -1) {
      array[index] = value.split(';')[0]
      array[array.length] = ""
    } else{
      array[index] = value
    }
    this.props.handleArrayChange(field, array)
  }
  printifyName = (name) => {
    return name.replace(/_/g, ' ').replace(/(?: |\b)(\w)/g, function(key) { return key.toUpperCase()})
  }

  render() {
    const {field, array, item} = this.props
    return <div>
    <Form.Group>
        <Form.Label>{ this.printifyName(field) }</Form.Label>

        { item[field].length > 0 ?
            item[ field ].map( (item, index) => <span key={index}>
              <Form.Control
                onChange={this.handleArrayChange}
                type='text'
                value={item}
                name={`${field}-${index}`} />
              </span> )
            : <Form.Control onChange={this.handleArrayChange} type='text' name={`${field}-${0}`} />}

    </Form.Group>
    </div>
  }

}

export default ArrayField
