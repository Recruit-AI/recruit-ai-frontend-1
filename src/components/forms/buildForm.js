import React from 'react'
import { Form } from 'react-bootstrap'
import { Input } from 'reactstrap'
import { withRouter } from "react-router-dom";

import formHelpers from './form_helpers'

import BasicTextField from './fieldTypes/basicText'
import TextAreaField from './fieldTypes/textArea'
import BasicNumberField from './fieldTypes/basicNumber'
import BasicBooleanField from './fieldTypes/basicBoolean'

import ArrayField from './fieldTypes/array'
import IdSelectField from './fieldTypes/idSelect'

import ExtraInfoField from './fieldTypes/extraInfo'
import ExtraInfoDefaultField from './fieldTypes/defaultExtraInfo'

import ConnectionRelationshipSelect from './fieldTypes/connectionRelationship'
import DualConnectionField from './fieldTypes/duplicateConnection'
import ImageField from './fieldTypes/imageFile'



const curr_user = localStorage.user ? JSON.parse(localStorage.user) : false

class FormHandler extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            formColor: 'transparent',
            duplicateConnection: false,
            bulkAdd: false,
            error: false

        }
    }

    //Used to set the status of the form- display confirmations & errors
    formStatus = (status) => {
        switch (status) {
            case "loading":
                this.colorForm("white")
                break;

            case "success":
                this.colorForm("green")
                break;

            case "error":
                this.colorForm("red")
                break;

            case "complete":
                this.colorForm("transparent")
                break;

            default:
                break;
        }
    }

    submitForm = async (e) => {
        e.preventDefault();
        this.formStatus('loading');
        const results = await this.props.submitForm(this.state.bulkAdd);
        console.log(results)
        const res = results.apiCall
        const redirectPath = results.redirect
        
        if (res.status === 200 || res.status === 201) {
            this.formStatus('success');
            if(redirectPath && !this.state.bulkAdd) { this.props.history.push(redirectPath) }
        } else {
            this.formStatus('error');
            if(res.response && res.response.status === 400) {
              this.setState({error: res.response.data.message})
            } else { this.setState({error: "Unknown error."}) }
        }

        setTimeout(() => { this.formStatus('complete') }, 250);
    }


    render() {

        return <Form
            style={{ backgroundColor: this.state.formColor }}
            onSubmit={this.submitForm}
            id={`${this.props.formClass}-${this.props.item.id}`} >

            {this.state.error ?  
            <div style={{backgroundColor: 'rgba(200,0,0,.4)', padding:'10px'}}>{this.state.error}</div>
            : ""}

            <h5>{this.props.existing ? `` : "Add New"}</h5>

            
            {Object.entries(this.props.item).map(itemField => <div key={itemField[0]}>

                {
                    //Basic text fields that don't wrap
                    formHelpers.checkBasicText(itemField) ?
                        <BasicTextField field={itemField} callback={this.handleChange} item={this.props.item} /> : ""
                }

                {
                    //Text areas with large boxes to write articles
                    formHelpers.checkTextField(itemField) ?
                        <TextAreaField field={itemField} callback={this.handleChange} item={this.props.item} /> : ""
                }

                {
                    //The forms that create a select field
                    formHelpers.checkIdSelectField(itemField) ?
                        <IdSelectField item={this.props.item} field={itemField[0]} value={itemField[1]} handleChange={this.handleChangeCb} /> : ""
                }

                {
                    //Special array handling UI
                    formHelpers.checkArrayOptionsField(itemField) ?
                        <ArrayField item={this.props.item} field={itemField[0]} array={itemField[1]} handleArrayChange={this.handleArrayChange} /> : ""
                }

                {
                    //For numbers
                    formHelpers.checkBasicNumber(itemField) ?
                        <BasicNumberField field={itemField} callback={this.handleChange} item={this.props.item} /> : ""
                }

                {
                    //Booleans create a checkbox
                    typeof itemField[1] === 'boolean' && itemField[0] != 'duplicateConnection' ?
                        <BasicBooleanField field={itemField} callback={this.handleCheck} item={this.props.item} /> : ""
                }

                {
                    //Shows the appropriate selections for connection relationships
                    itemField[0] === 'connection_relationship' ?
                        <ConnectionRelationshipSelect field={itemField} callback={this.handleSelectIntChange} item={this.props.item} /> : ""
                }

                {
                    //Displays the fields for an image
                    itemField[0] === 'image_url' ?
                        <ImageField field={itemField} callback={this.handleFileChange} item={this.props.item} /> : ""
                }

                {
                    //The extra info section for symbols
                    itemField[0] === 'extra_info' ?
                        <ExtraInfoField field={itemField} callback={this.handleInfoChange} item={this.props.item} /> : ""
                }

                {
                    //The settings for kinds where you set the extra info fields themselves
                    itemField[0] === 'default_extra_info' ?
                        <ExtraInfoDefaultField item={this.props.item} fieldsObject={itemField[1]} handleExtraInfoChange={this.handleExtraInfoChange} /> : ""
                }

                { /* ADD hidden fields here */ }
                {itemField[0] === 'foreign_id' ? <Input type="hidden" name="foreign_id" value={this.props.item.foreign_id} /> : ""}
                {itemField[0] === 'foreign_key' ? <Input type="hidden" name="foreign_key" value={this.props.item.foreign_key} /> : ""}
                {itemField[0] === 'foreign_class' ? <Input type="hidden" name="foreign_class" value={this.props.item.foreign_class} /> : ""}
                
                { /* Add any notes for any fields here */ }
                {itemField[0] === 'start_year' ? "Values greater than 0 are treated as AD, and negative values are treated as BCE." : ""}
                {itemField[0] === 'end_year' ? "Values greater than 0 are treated as AD, and negative values are treated as BCE. Enter '2100' exactly if the pantheon is still living." : ""}

            </div>)}

            { /* These are fields that are targeted by classForm */ }
            {
                //This is a custom field for a symbol connections, which, if set, tells the backend to create an inverse "duplicate"
                <DualConnectionField stateSettings={this.state} callback={this.toggleDuplicate} />
            }
            { 
                //BULK ADD is an admin feature that does not refresh the page/form on submit, allowing for much faster entry, reusing of form data
                this.props.existing ? "" : 
                    <div>BULK ADD 
                        <input onChange={this.toggleBulkAdd} type="checkbox" checked={this.state.bulkAdd} />  
                        <p>BULK ADD is an admin feature that does not refresh the page/form on submit, allowing for much faster entry when entering in multiple articles, but YOU MUST MANUALLY REFRESH PAGE TO SEE CHANGES</p>  
                    </div> 
            }

            <button type='submit'>{this.props.existing ? `Edit` : "Add"}</button>
            <button onClick={this.deleteItem}>Delete</button>

        </Form>
    }


    //UTITLITY FUNCTIONS

    colorForm = (color) => {
        this.setState({ formColor: color })
    }

    //ALL THE CHANGE FUNCTIONS

    handleChange = (e) => {
        this.props.updateItem({
            ...this.props.item,
            [e.target.name]: e.target.value
        })
    }

    handleCheck = (e) => {
        this.props.updateItem({
            ...this.props.item,
            [e.target.name]: e.target.checked
        })
    }

    handleChangeCb = (field, value) => {
        this.props.updateItem({
            ...this.props.item,
            [field]: value
        })
    }

    handleArrayChange = (field, array) => {
        this.props.updateItem({
            ...this.props.item,
            [field]: array
        })
    }

    handleInfoChange = (e) => {
        this.props.updateItem({
            ...this.props.item,
            extra_info: {
                ...this.props.item.extra_info,
                [e.target.name]: e.target.value
            }
        })
    }

    handleExtraInfoChange = (fieldsObject) => {
        this.props.updateItem({
            ...this.props.item,
            default_extra_info: fieldsObject
        })
    }

    handleFileChange = (e) => {
        if (e.target.files[0]) {
            this.props.updateItem({
                ...this.props.item,
                image_raw: e.target.files[0],
                image_preview_url: URL.createObjectURL(e.target.files[0])
            })
        }
    }

    handleSelectIntChange = (e) => {
        this.props.updateItem({
            ...this.props.item,
            [e.target.name]: Number.parseInt(e.target.value)
        })
    }

    toggleDuplicate = (e) => {
        this.setState({ duplicateConnection: !this.state.duplicateConnection })
    }
    
    toggleBulkAdd = (e) => {
        this.setState({bulkAdd: !this.state.bulkAdd})
    }


}

export default withRouter(FormHandler)



















// handleChange = (e) => {
//     this.setState({
//         item: {
//             ...this.state.item,
//             [e.target.name]: e.target.value
//         }
//     })
// }

// handleCheck = (e) => {
//     this.setState({
//         item: {
//             ...this.state.item,
//             [e.target.name]: e.target.checked
//         }
//     })
// }

// handleChangeCb = (field, value) => {
//     this.setState({
//         item: {
//             ...this.state.item,
//             [field]: value
//         }
//     })
// }

// handleArrayChange = (field, array) => {
//   this.setState({
//         item: {
//             ...this.state.item,
//             [field]: array
//         }
//     })
// }

// handleInfoChange = (e) => {
//     this.setState({
//         item: {
//             ...this.state.item,
//             extra_info: {
//                 ...this.state.item.extra_info,
//                 [e.target.name]: e.target.value
//             }
//         }
//     })
// }

// handleExtraInfoChange = (fieldsObject) => {
//   this.setState({
//       item: {
//           ...this.state.item,
//           default_extra_info: fieldsObject
//       }
//   })
// }



















{/*
<Form onSubmit={this.submitForm} className="handlerForm" style={{margin:'auto',backgroundColor:this.state.formColor}}>
      <h2 className="formHeader">{ this.state.existing ? `Edit` : "Add"}</h2>
      { Object.entries(this.state.item).map(itemField => <div key={itemField[0]} className="formField">

      {
                  //Basic text fields that don't wrap
                  formHelpers.checkBasicText(itemField) ?
                  <BasicTextField field={itemField} callback={this.handleChange} item={this.state.item} /> : ""
                }

                {
                  //Text areas with large boxes to write articles
                  formHelpers.checkTextField(itemField) ?
                  <TextAreaField field={itemField} callback={this.handleChange} item={this.state.item} /> : ""
                }

                {
                  //The forms that create a select field
                  formHelpers.checkIdSelectField(itemField)  ?
                  <IdSelectField item={this.state.item} field={itemField[0]} value={itemField[1]} handleChange={this.handleChangeCb}/> : ""
                }

                {
                  //Special array handling UI
                  formHelpers.checkArrayOptionsField(itemField) ?
                  <ArrayField item={this.state.item} field={itemField[0]} array={itemField[1]} handleArrayChange={this.handleArrayChange}/> : ""
                 }

                {
                  //For numbers
                  formHelpers.checkBasicNumber(itemField)  ?
                  <BasicNumberField field={itemField} callback={this.handleChange} item={this.state.item} /> : ""
                }

                {
                  //Booleans create a checkbox
                  typeof itemField[1] === 'boolean' && itemField[0] != 'duplicateConnection' ?
                  <BasicBooleanField field={itemField} callback={this.handleCheck} item={this.state.item} />: ""
                }


                {itemField[0] === 'start_year' ? "Values greater than 0 are treated as AD, and negative values are treated as BCE." : ""}
                {itemField[0] === 'end_year' ? "Values greater than 0 are treated as AD, and negative values are treated as BCE. Enter '2100' exactly if the pantheon is still living." : ""}

                {
                  //The extra info section for symbols
                  itemField[0] === 'extra_info' ?
                  <ExtraInfoField field={itemField} callback={this.handleInfoChange} item={this.state.item} /> : ""
                }

                {
                  //The settings for kinds where you set the extra info fields themselves
                  itemField[0] === 'default_extra_info' ?
                  <ExtraInfoDefaultField item={this.state.item} fieldsObject={itemField[1]} handleExtraInfoChange={this.handleExtraInfoChange} /> : ""
                }



      </div>) }


    <button type='submit'>Save</button>
    <button onClick={this.deleteItem}>Delete</button>

            </Form> */}