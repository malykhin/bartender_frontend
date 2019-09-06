import React, { useState } from 'react'
import { bool, func } from 'prop-types'

import { Dialog } from '@blueprintjs/core'

import { TextInput } from 'components/formPrimitives/TextInput'
import { SaveButton } from 'components/formPrimitives/SaveButton'

import './RecipeDialog.css'

export const RecipeDialog = ({ isOpen, onClose }) => {
  const [form, setForm] = useState({})
  const isLoading = false
  return (
    <Dialog icon="filter" onClose={onClose} title={'Recipe'} isOpen={isOpen}>
      <div styleName="container">
        <TextInput isLoading={isLoading} form={form} onChange={setForm} placeholder="Name" name="name" />
        <TextInput isLoading={isLoading} form={form} onChange={setForm} placeholder="Description" name="description" />
        <SaveButton />
      </div>
    </Dialog>
  )
}

RecipeDialog.propTypes = {
  isOpen: bool.isRequired,
  onClose: func.isRequired,
}
