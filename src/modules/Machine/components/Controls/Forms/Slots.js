import React, { useState } from 'react'
import { array } from 'prop-types'
import { useMutation } from '@apollo/react-hooks'

import { FormGroup, H3 } from '@blueprintjs/core'

import { SaveButton } from 'components/formPrimitives/SaveButton'
import { NumInput } from 'components/formPrimitives/NumInput'
import { TextInput } from 'components/formPrimitives/TextInput'
import { Select } from 'components/formPrimitives/Select'

import styles from './styles.css'

import SLOTS_QUERY from 'queries/slots.graphql'
import CREATE_SLOT_MUTATION from 'mutations/createSlot.graphql'

export const Slots = ({ liquids }) => {
  const [form, setForm] = useState({})

  const [createSlot, { loading: slotLoading }] = useMutation(CREATE_SLOT_MUTATION, {
    refetchQueries: [{ query: SLOTS_QUERY }],
  })

  const handleCreate = () => {
    createSlot({ variables: form })
    setForm({})
  }

  const isLoading = slotLoading

  return (
    <div styleName="wrapper">
      <H3 className={styles.header}>Create slot</H3>
      <div styleName="controls_container">
        <FormGroup>
          <TextInput isLoading={isLoading} form={form} onChange={setForm} placeholder="Name" name="name" />
          <Select
            isLoading={isLoading}
            form={form}
            options={liquids}
            onChange={setForm}
            placeholder="Liquid"
            icon="glass"
            name="liquidId"
          />
          <TextInput
            isLoading={isLoading}
            form={form}
            onChange={setForm}
            placeholder="Description"
            name="description"
          />
        </FormGroup>
        <FormGroup>
          <NumInput
            isLoading={isLoading}
            form={form}
            onChange={setForm}
            placeholder="Coordinate, mm"
            name="coordinate"
          />
          <NumInput
            isLoading={isLoading}
            form={form}
            onChange={setForm}
            placeholder="Shot volume, ml"
            name="shotVolume"
          />
        </FormGroup>
      </div>
      <div styleName="footer">
        <SaveButton isLoading={isLoading} onClick={handleCreate} />
      </div>
    </div>
  )
}

Slots.propTypes = {
  liquids: array.isRequired,
}
