import React from 'react'
import { string, object, func, bool } from 'prop-types'

import { InputGroup, FormGroup, Classes } from '@blueprintjs/core'

import './styles.css'

export const TextInput = ({ placeholder, name, form, onChange, inline, isLoading }) => {
  const handleChange = (e) => onChange({ ...form, [name]: e.target.value })

  return (
    <FormGroup className={isLoading && Classes.SKELETON} label={placeholder} inline={inline}>
      <InputGroup placeholder={placeholder} value={form[name] || ''} onChange={handleChange} />
    </FormGroup>
  )
}

TextInput.defaultProps = {
  inline: false,
  isLoading: false,
}

TextInput.propTypes = {
  placeholder: string.isRequired,
  name: string.isRequired,
  form: object.isRequired,
  onChange: func.isRequired,
  inline: bool,
  isLoading: bool,
}
