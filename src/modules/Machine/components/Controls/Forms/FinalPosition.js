import React, { useState, useMemo } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { get } from 'lodash'

import { FormGroup, H3 } from '@blueprintjs/core'

import { SaveButton } from 'components/formPrimitives/SaveButton'
import { NumInput } from 'components/formPrimitives/NumInput'

import styles from './styles.css'

import FINAL_POSITION_QUERY from 'queries/finalPosition.graphql'
import EDIT_FINAL_POSITION_MUTATION from 'mutations/editFinalPosition.graphql'

export const FinalPosition = () => {
  const [form, setForm] = useState({})

  const { data, loading } = useQuery(FINAL_POSITION_QUERY)

  const finalPosition = get(data, 'machine', {})

  useMemo(() => {
    setForm(finalPosition)
  }, [data])

  const [editFinalPosition, { loading: editLoading }] = useMutation(EDIT_FINAL_POSITION_MUTATION, {
    refetchQueries: [{ query: FINAL_POSITION_QUERY }],
  })

  const handleSave = () => editFinalPosition({ variables: form })

  const isLoading = loading || editLoading

  return (
    <div styleName="wrapper narrow_wrapper">
      <H3 className={styles.header}>Final position setup</H3>
      <div styleName="controls_container">
        <FormGroup className={styles.center}>
          <NumInput
            isLoading={isLoading}
            form={form}
            onChange={setForm}
            name="finalPosition"
            placeholder="Final position, mm"
          />
        </FormGroup>
      </div>
      <SaveButton isLoading={isLoading} onClick={handleSave} />
    </div>
  )
}
