import React, { useState, useMemo } from 'react'
import { FormGroup, H3 } from '@blueprintjs/core'
import { useQuery } from '@apollo/react-hooks'
import { get } from 'lodash'

import { NumInput } from 'components/formPrimitives/NumInput'
import { SaveButton } from 'components/formPrimitives/SaveButton'

import styles from './styles.css'

import DOZER_QUERY from 'queries/dozer.graphql'

export const Dozer = () => {
  const [form, setForm] = useState({})

  const { data, loading } = useQuery(DOZER_QUERY)

  const dozer = get(data, 'machine', {})

  useMemo(() => {
    setForm(dozer)
  }, [data])

  const isLoading = loading

  return (
    <div styleName="wrapper">
      <H3 className={styles.header}>Dozer setup</H3>
      <div styleName="controls_container">
        <FormGroup>
          <NumInput isLoading={isLoading} form={form} onChange={setForm} name="dozerIdle" placeholder="Idle position" />
          <NumInput isLoading={isLoading} form={form} onChange={setForm} name="dozerOff" placeholder="Off position" />
          <NumInput isLoading={isLoading} form={form} onChange={setForm} name="dozerOn" placeholder="On position" />
        </FormGroup>
        <FormGroup>
          <NumInput
            isLoading={isLoading}
            form={form}
            onChange={setForm}
            name="dozerCycleDelay"
            placeholder="Dozer on delay, ms"
          />
        </FormGroup>
      </div>
      <SaveButton isLoading={isLoading} />
    </div>
  )
}
