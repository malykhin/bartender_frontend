import React, { useState } from 'react'
import { FormGroup, H3 } from '@blueprintjs/core'

import { NumInput } from 'components/formPrimitives/NumInput'
import { SaveButton } from 'components/formPrimitives/SaveButton'

import styles from './styles.css'

export const Dozer = () => {
  const [form, setForm] = useState({})
  return (
    <div styleName="wrapper">
      <H3 className={styles.header}>Dozer setup</H3>
      <div styleName="controls_container">
        <FormGroup>
          <NumInput form={form} onChange={setForm} name="idlePosition" placeholder="Idle position" />
          <NumInput form={form} onChange={setForm} name="offPosition" placeholder="Off position" />
          <NumInput form={form} onChange={setForm} name="onPosition" placeholder="On position" />
        </FormGroup>
        <FormGroup>
          <NumInput form={form} onChange={setForm} name="dozerOnDelay" placeholder="Dozer on delay, ms" />
          <NumInput form={form} onChange={setForm} name="dozerMoveDelay" placeholder="Dozer move delay, ms" />
        </FormGroup>
      </div>
      <SaveButton />
    </div>
  )
}
