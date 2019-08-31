import React, { useState, useMemo } from 'react'
import { FormGroup, H3 } from '@blueprintjs/core'
import { useQuery } from '@apollo/react-hooks'
import { get } from 'lodash'

import { SaveButton } from 'components/formPrimitives/SaveButton'
import { NumInput } from 'components/formPrimitives/NumInput'

import styles from './styles.css'

import AXIS_QUERY from 'queries/axis.graphql'

export const Axis = () => {
  const [form, setForm] = useState({})

  const { data, loading } = useQuery(AXIS_QUERY)

  const axis = get(data, 'machine', {})

  useMemo(() => {
    setForm(axis)
  }, [data])

  const isLoading = loading

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
      <SaveButton isLoading={isLoading} onClick={() => console.log(form)} />
    </div>
  )
}
