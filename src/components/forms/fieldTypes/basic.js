import React from 'react'
import { Form } from 'react-bootstrap'

import formHelpers from '../form_helpers'

export default (props) => {
    const {field, item, callback, type, label, as_setting} = props

    return <Form.Group>

        <Form.Label>
            { label || formHelpers.printifyName(field[0]) }
        </Form.Label>
        
        <Form.Control 
            type={type}
            onChange={callback} 
            name={field[0]} 
            placeholder={field[0]}
            value={props.value || item[field[0]]}
            
            as={as_setting}
            rows={5}
            checked={props.value || item[field[0]]} />

    </Form.Group>
}