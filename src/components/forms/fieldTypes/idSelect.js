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

    switch(this.props.field) {
      case "influenced_id":
      case "influencer_id":
      case "creator_pantheon_id":
      case "kp_pantheon_id":
      case "sp_pantheon_id":
        axios
           .get('https://grimwire.herokuapp.com/api/pantheons')
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
           break;
      case "symbol_kind_id":
      case "kp_kind_id":
      case "ck_kind_id":
        axios
           .get('https://grimwire.herokuapp.com/api/kinds')
           .then(res => {
             this.setState({
               allItems: res.data.map(
                 item => ({
                   ...item,
                   name: item.kind_name,
                   id: item.kind_id })),
               });
           })
           .catch(err => console.log(err) );
           break;


        case "ck_category_id":
        case "cp_prereq_id":
        case "cp_category_id":
             axios
                .get('https://grimwire.herokuapp.com/api/categories')
                .then(res => {
                  this.setState({
                    allItems: res.data.map(
                      item => ({
                        ...item,
                        name: item.category_name,
                        id: item.category_id })),
                    });
                })
                .catch(err => console.log(err) );
                break;

                case "connected_symbol_id":
                case "main_symbol_id":
                case "sp_symbol_id":
                     axios
                        .get('https://grimwire.herokuapp.com/api/symbols')
                        .then(res => {
                          this.setState({
                            allItems: res.data.map(
                              item => ({
                                ...item,
                                name: item.symbol_name,
                                id: item.symbol_id })),
                            });
                        })
                        .catch(err => console.log(err) );
                        break;

                  case "foreign_id":
                    let string = this.props.item.foreign_class.toLowerCase()
                    let plural_string = ""
                    if(string === 'category'){
                      plural_string='categories'
                    } else {
                      plural_string = string + 's'
                    }

                    console.log("FOREIGNID", string)
                    axios
                       .get(`https://grimwire.herokuapp.com/api/${plural_string}`)
                       .then(res => {
                         this.setState({
                           allItems: res.data.map(
                             item => ({
                               ...item,
                               name: item[`${string}_name`],
                               id: item[`${string}_id`] })),
                           });
                       })
                       .catch(err => console.log(err) );
                       break;



    }

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


    return <div>
    <Form.Group>
        <Form.Label>
          { field.replace("_id", "")
            .replace("kp_", "")
            .replace("ck_", "")
            .replace("cp_", "").replace(/([A-Z])/g, ' $1').replace(/^./, function(str){ return str.toUpperCase(); }) }:
        </Form.Label>


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
