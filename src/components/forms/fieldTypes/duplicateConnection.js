import React from 'react'
import {Form} from 'react-bootstrap'

const Field = (props) => {
    const { stateSettings, callback } = props

    return stateSettings.formClass==='symbol_connections' && !stateSettings.existing ? <Form.Group>
    <Form.Label>Dual Connection?</Form.Label>
    <Form.Control onChange={callback} type="checkbox" checked={stateSettings.duplicateConnection} />
    </Form.Group>
    : ""
}

export default Field