import React, { useState, useMemo } from 'react'
import { bool, func, string } from 'prop-types'

import { useQuery } from '@apollo/react-hooks'
import { get } from 'lodash'

import { Dialog } from '@blueprintjs/core'

import { TextInput } from 'components/formPrimitives/TextInput'
import { SaveButton } from 'components/formPrimitives/SaveButton'

import './RecipeDialog.css'

import RECIPE_QUERY from 'queries/recipe.graphql'

export const RecipeDialog = ({ isOpen, onClose, editId, handleEdit }) => {
  const [form, setForm] = useState({})
  const { data, loading } = useQuery(RECIPE_QUERY, { variables: { recipeId: editId } })
  const recipe = get(data, 'recipe', {})

  useMemo(() => {
    setForm(recipe)
  }, [data])

  const isLoading = loading

  const editHandler = () => handleEdit(form)

  return (
    <Dialog icon="filter" onClose={onClose} title={'Recipe'} isOpen={isOpen}>
      <div styleName="container">
        <TextInput isLoading={isLoading} form={form} onChange={setForm} placeholder="Name" name="name" />
        <TextInput isLoading={isLoading} form={form} onChange={setForm} placeholder="Description" name="description" />
        <SaveButton isLoading={isLoading} onClick={editHandler} />
      </div>
    </Dialog>
  )
}

RecipeDialog.propTypes = {
  isOpen: bool.isRequired,
  onClose: func.isRequired,
  handleEdit: func.isRequired,
  editId: string.isRequired,
}
