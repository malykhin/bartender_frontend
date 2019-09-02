import React, { useState, useMemo } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { get } from 'lodash'
import { FormGroup, H3 } from '@blueprintjs/core'

import { SaveButton } from 'components/formPrimitives/SaveButton'
import { NumInput } from 'components/formPrimitives/NumInput'

import styles from './styles.css'

import AXIS_QUERY from 'queries/axis.graphql'
import EDIT_AXIS_MUTATION from 'mutations/editAxis.graphql'

export const Axis = () => {
  const [form, setForm] = useState({})

  const { data, loading } = useQuery(AXIS_QUERY)

  const axis = get(data, 'machine', {})

  useMemo(() => {
    setForm(axis)
  }, [data])

  const [editAxis, { loading: editLoading }] = useMutation(EDIT_AXIS_MUTATION, {
    refetchQueries: [{ query: AXIS_QUERY }],
  })

  const isLoading = loading || editLoading

  return (
    <div styleName="wrapper">
      <H3 className={styles.header}>Axis setup</H3>
      <div styleName="controls_container">
        <FormGroup>
          <NumInput
            isLoading={isLoading}
            form={form}
            onChange={setForm}
            name="maxStroke"
            placeholder="Maximum stroke, mm"
          />
          <NumInput isLoading={isLoading} form={form} onChange={setForm} name="speed" placeholder="Speed, mm/s" />
          <NumInput isLoading={isLoading} form={form} onChange={setForm} name="accel" placeholder="Accel, mm/s^2" />
          <NumInput isLoading={isLoading} form={form} onChange={setForm} name="stepsPerMm" placeholder="Steps per mm" />
        </FormGroup>
        <FormGroup>
          <NumInput
            isLoading={isLoading}
            form={form}
            onChange={setForm}
            name="zeroSpeed"
            placeholder="Zero speed, mm/s"
          />
          <NumInput
            isLoading={isLoading}
            form={form}
            onChange={setForm}
            name="zeroAccel"
            placeholder="Zero accel, mm/s^2"
          />
        </FormGroup>
      </div>
      <SaveButton isLoading={isLoading} onClick={() => editAxis({ variables: form })} />
    </div>
  )
}
