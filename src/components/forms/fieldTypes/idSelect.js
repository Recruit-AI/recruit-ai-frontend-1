import React from 'react'
import axios from 'axios'
import {Form} from 'react-bootstrap'

class IdList extends React.Component {
  constructor(props) {
      super(props)
      this.state = {
        possibleOptions: [],
        allItems: [],
      }
  }

  componentDidMount = () => {
         axios
            .get('http://localhost:4001/api/pantheons')
            .then(res => {
              this.setState({
                allItems: res.data.map(
                  item => ({
                    ...item,
                    name: item.pantheon_name,
                    id: item.pantheon_id })),
                });
            })
            .catch(err => console.log(err) );
  }

  handleTextChange = (e) => {
    const searchTerm = e.target.value
    if(searchTerm === "") {
        this.setState({possibleOptions: [] })
    } else{
      this.setState({possibleOptions: this.state.allItems.filter(item => item.name.indexOf(searchTerm) >= 0) })
    }
  }

  handleSelectionChange = (e) => {
    const pair = e.target.value.split('-')
    const field = pair[0]
    const id = pair[1]
    const item = this.props.item
    const array = item[field]
    this.props.handleChange(field, id)
  }

  render() {
    const {field, value, item} = this.props
    const {allItems} = this.state
    const selected = allItems.filter(obj => obj.id === value)[0]

    console.log(field, value, item, selected)


    return <div>
    <Form.Group>
        <Form.Label>{ field.replace("Ids", "").replace(/([A-Z])/g, ' $1').replace(/^./, function(str){ return str.toUpperCase(); }) }</Form.Label>


           <div>



              { selected ? selected.name : "Select" }


                <Form.Control
                  onChange={this.handleTextChange}
                  type='text'
                  />

                <Form.Control as="select" onChange={this.handleSelectionChange}>
                  <option value="-1">-please select-</option>
                  {
                    this.state.possibleOptions.map(option =>
                      <option key={option.id} value={ `${field}-${option.id}` } >
                        {option.name}
                      </option>)
                  }
                </Form.Control>
      </div>



    </Form.Group>
    </div>
  }

}



export default IdList
