import React, { useState, useMemo } from 'react'
import { FormGroup, H3 } from '@blueprintjs/core'
import { useQuery } from '@apollo/react-hooks'
import { get } from 'lodash'

import { SaveButton } from 'components/formPrimitives/SaveButton'
import { NumInput } from 'components/formPrimitives/NumInput'

import styles from './styles.css'

import FINAL_POSITION_QUERY from 'queries/finalPosition.graphql'

export const FinalPosition = () => {
  const [form, setForm] = useState({})

  const { data, loading } = useQuery(FINAL_POSITION_QUERY)

  const finalPosition = get(data, 'machine', {})

  useMemo(() => {
    setForm(finalPosition)
  }, [data])

  const isLoading = loading

  return (
    <div styleName="wrapper narrow_wrapper">
      <H3 className={styles.header}>Final position setup</H3>
      <div styleName="controls_container">
        <FormGroup className={styles.center}>
          <NumInput isLoading={isLoading} form={form} onChange={setForm} name="finalPosition" placeholder="Final position, mm" />
        </FormGroup>
      </div>
      <SaveButton isLoading={isLoading} />
    </div>
  )
}
