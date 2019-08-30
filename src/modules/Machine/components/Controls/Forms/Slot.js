import React, { useState, useMemo } from 'react'
import { array, string, func } from 'prop-types'
import { useMutation, useQuery } from '@apollo/react-hooks'
import { get } from 'lodash'

import { FormGroup, H3 } from '@blueprintjs/core'

import { SaveButton } from 'components/formPrimitives/SaveButton'
import { DeleteButton } from 'components/formPrimitives/DeleteButton'
import { NumInput } from 'components/formPrimitives/NumInput'
import { TextInput } from 'components/formPrimitives/TextInput'
import { Select } from 'components/formPrimitives/Select'

import styles from './styles.css'

import DELETE_SLOT_MUTATION from 'mutations/deleteSlot.graphql'
import SLOTS_QUERY from 'queries/slots.graphql'
import SLOT_QUERY from 'queries/slot.graphql'

export const Slot = ({ liquids, id, setDefaultView }) => {
  const [form, setForm] = useState({})

  const { data, loading } = useQuery(SLOT_QUERY, {
    variables: {
      slotId: id,
    },
  })

  const slot = get(data, 'slot', {})

  useMemo(() => {
    setForm(slot)
  }, [data])

  const [deleteSlot, { loading: deleteLoading }] = useMutation(DELETE_SLOT_MUTATION, {
    refetchQueries: [{ query: SLOTS_QUERY }],
  })

  const handleSlotDelete = () => {
    deleteSlot({ variables: { id } })
    setDefaultView(null)
  }

  const isLoading = deleteLoading || loading

  return (
    <div styleName="wrapper">
      <H3 className={styles.header}>Slot setup</H3>
      <div styleName="controls_container">
        <FormGroup>
          <TextInput isLoading={isLoading} form={form} onChange={setForm} placeholder="Name" name="name" />
          <Select
            isLoading={isLoading}
            options={liquids}
            form={form}
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
        <DeleteButton isLoading={isLoading} onClick={handleSlotDelete} />
        <SaveButton isLoading={isLoading} onClick={() => console.log(form)} />
      </div>
    </div>
  )
}

Slot.propTypes = {
  liquids: array.isRequired,
  id: string.isRequired,
  setDefaultView: func.isRequired,
}
