import React, { useState } from 'react'
import { FormGroup, H3 } from '@blueprintjs/core'

import { SaveButton } from '../../../../../components/formPrimitives/SaveButton'
import { NumInput } from '../../../../../components/formPrimitives/NumInput'

import styles from './styles.css'

export const HomePosition = () => {
  const [form, setForm] = useState({})

  return (
    <div styleName="wrapper narrow_wrapper">
      <H3 className={styles.header}>Home position setup</H3>
      <div styleName="controls_container">
        <FormGroup className={styles.center}>
          <NumInput form={form} onChange={setForm} name="homePosition" placeholder="Home position, mm" />
        </FormGroup>
      </div>
      <SaveButton />
    </div>
  )
}
