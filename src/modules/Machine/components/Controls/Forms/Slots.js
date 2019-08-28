import React, { useState } from 'react'
import { FormGroup, H3 } from '@blueprintjs/core'

import { SaveButton } from '../../../../../components/formPrimitives/SaveButton'
import { NumInput } from '../../../../../components/formPrimitives/NumInput'
import { TextInput } from '../../../../../components/formPrimitives/TextInput'
import { Select } from '../../../../../components/formPrimitives/Select'

import styles from './styles.css'

export const Slots = () => {
  const [form, setForm] = useState({})

  return (
    <div styleName="wrapper">
      <H3 className={styles.header}>Create slot</H3>
      <div styleName="controls_container">
        <FormGroup>
          <TextInput form={form} onChange={setForm} placeholder="Name" name="name" />
          <Select form={form} onChange={setForm} placeholder="Liquid" icon="glass" name="liquidId" />
          <TextInput form={form} onChange={setForm} placeholder="Description" name="description" />
        </FormGroup>
        <FormGroup>
          <NumInput form={form} onChange={setForm} placeholder="Coordinate, mm" name="coordinate" />
          <NumInput form={form} onChange={setForm} placeholder="Shot volume, ml" name="shotVolume" />
        </FormGroup>
      </div>
      <div styleName="footer">
        <SaveButton onClick={() => console.log(form)} />
      </div>
    </div>
  )
}
