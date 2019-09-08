import React, { useState, useMemo } from 'react'
import { bool, func, string } from 'prop-types'

import { useQuery } from '@apollo/react-hooks'
import { get } from 'lodash'

import { Dialog } from '@blueprintjs/core'

import { TextInput } from 'components/formPrimitives/TextInput'
import { SaveButton } from 'components/formPrimitives/SaveButton'

import './LiquidDialog.css'

import LIQUID_QUERY from 'queries/liquid.graphql'

export const LiquidDialog = ({ isOpen, onClose, editId, handleEdit }) => {
  const [form, setForm] = useState({})

  const { data, loading } = useQuery(LIQUID_QUERY, { variables: { liquidId: editId } })

  const liquid = get(data, 'liquid', {})

  useMemo(() => {
    setForm(liquid)
  }, [data])

  const isLoading = loading

  const editHandler = () => handleEdit(form)

  return (
    <Dialog icon="filter" onClose={onClose} title={'Liquid'} isOpen={isOpen}>
      <div styleName="container">
        <TextInput isLoading={isLoading} form={form} onChange={setForm} placeholder="Name" name="name" />
        <TextInput isLoading={isLoading} form={form} onChange={setForm} placeholder="Description" name="description" />
        <SaveButton isLoading={isLoading} onClick={editHandler} />
      </div>
    </Dialog>
  )
}

LiquidDialog.propTypes = {
  isOpen: bool.isRequired,
  onClose: func.isRequired,
  handleEdit: func.isRequired,
  editId: string.isRequired,
}
