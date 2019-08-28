import React from 'react'
import { InputGroup, FormGroup } from '@blueprintjs/core'
import { string, object, func, bool } from 'prop-types'

import './styles.css'

export const TextInput = ({ placeholder, name, form, onChange, inline }) => {
  const handleChange = (e) => onChange({ ...form, [name]: e.target.value })
  return (
    <FormGroup label={placeholder} inline={inline}>
      <InputGroup placeholder={placeholder} value={form[name] || ''} onChange={handleChange} />
    </FormGroup>
  )
}

TextInput.defaultProps = {
  inline: false,
}

TextInput.propTypes = {
  placeholder: string.isRequired,
  name: string.isRequired,
  form: object.isRequired,
  onChange: func.isRequired,
  inline: bool,
}
