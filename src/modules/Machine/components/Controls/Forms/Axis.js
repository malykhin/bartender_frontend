import React, { useState } from 'react'
import { FormGroup, H3 } from '@blueprintjs/core'

import { SaveButton } from '../../../../../components/formPrimitives/SaveButton'
import { NumInput } from '../../../../../components/formPrimitives/NumInput'

import styles from './styles.css'

export const Axis = () => {
  const [form, setForm] = useState({})

  return (
    <div styleName="wrapper">
      <H3 className={styles.header}>Axis setup</H3>
      <div styleName="controls_container">
        <FormGroup>
          <NumInput form={form} onChange={setForm} name="maxStroke" placeholder="Maximum stroke, mm" />
          <NumInput form={form} onChange={setForm} name="maxSpeed" placeholder="Maximum speed, mm/s" />
          <NumInput form={form} onChange={setForm} name="accel" placeholder="Accel, mm/s^2" />
          <NumInput form={form} onChange={setForm} name="stepsPerMm" placeholder="Steps per mm" />
        </FormGroup>
        <FormGroup>
          <NumInput form={form} onChange={setForm} name="zeroStroke" placeholder="Zero stroke, mm" />
          <NumInput form={form} onChange={setForm} name="zeroSpeed" placeholder="Zero speed, mm/s" />
          <NumInput form={form} onChange={setForm} name="zeroAccel" placeholder="Zero accel, mm/s^2" />
        </FormGroup>
      </div>
      <SaveButton onClick={() => console.log(form)} />
    </div>
  )
}
