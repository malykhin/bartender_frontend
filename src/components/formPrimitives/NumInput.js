import React from 'react'
import { string, object, func, bool } from 'prop-types'
import { isFinite } from 'lodash'

import { NumericInput, FormGroup, Classes } from '@blueprintjs/core'

import './styles.css'

export const NumInput = ({ placeholder, name, form, onChange, isLoading }) => {
  const handleChange = (value) => onChange({ ...form, [name]: value })

  return (
    <FormGroup className={isLoading && Classes.SKELETON} label={placeholder}>
      <NumericInput
        placeholder={placeholder}
        value={isFinite(form[name]) ? form[name] : ''}
        onValueChange={handleChange}
      />
    </FormGroup>
  )
}

NumInput.defaultProps = {
  isLoading: false,
}

NumInput.propTypes = {
  placeholder: string.isRequired,
  name: string.isRequired,
  form: object.isRequired,
  onChange: func.isRequired,
  isLoading: bool,
}
