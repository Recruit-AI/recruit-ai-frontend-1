import React from 'react'
import { Form } from 'react-bootstrap'

const Field = (props) => {
  const { field, item, callback } = props

  return <Form.Group>
    <Form.Label>Type of Connection</Form.Label>
    <Form.Control as="select" value={item[field[0]]} name={field[0]} onChange={callback}>
      <option value="-1">-please select-</option>
      {
        ['Source', 'Mention', 'Related', 'Association', 'Property', 'Alternate Form', 'Type', 'Item'].map((option, i) =>
          <option key={option} value={i} >
            {option}
          </option>)
      }
    </Form.Control>

  </Form.Group>
}

export default Field