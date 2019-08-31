import React, { useState, useMemo } from 'react'
import { FormGroup, H3 } from '@blueprintjs/core'
import { useQuery } from '@apollo/react-hooks'
import { get } from 'lodash'

import { SaveButton } from 'components/formPrimitives/SaveButton'
import { NumInput } from 'components/formPrimitives/NumInput'

import styles from './styles.css'

import HOME_POSITION_QUERY from 'queries/homePosition.graphql'

export const HomePosition = () => {
  const [form, setForm] = useState({})

  const { data, loading } = useQuery(HOME_POSITION_QUERY)

  const homePosition = get(data, 'machine', {})

  useMemo(() => {
    setForm(homePosition)
  }, [data])

  const isLoading = loading

  return (
    <div styleName="wrapper narrow_wrapper">
      <H3 className={styles.header}>Home position setup</H3>
      <div styleName="controls_container">
        <FormGroup className={styles.center}>
          <NumInput
            isLoading={isLoading}
            form={form}
            onChange={setForm}
            name="homePosition"
            placeholder="Home position, mm"
          />
        </FormGroup>
      </div>
      <SaveButton isLoading={isLoading} />
    </div>
  )
}
