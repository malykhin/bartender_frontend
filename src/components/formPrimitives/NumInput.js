import React from 'react'
import { NumericInput, FormGroup } from '@blueprintjs/core'
import { string, object, func } from 'prop-types'

import './styles.css'

export const NumInput = ({ placeholder, name, form, onChange }) => {
  const handleChange = (value) => onChange({ ...form, [name]: value })
  return (
    <FormGroup label={placeholder}>
      <NumericInput placeholder={placeholder} value={form[name] || ''} onValueChange={handleChange} />
    </FormGroup>
  )
}

NumInput.propTypes = {
  placeholder: string.isRequired,
  name: string.isRequired,
  form: object.isRequired,
  onChange: func.isRequired,
}
