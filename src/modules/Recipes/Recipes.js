import React, { useState } from 'react'
import { get } from 'lodash'

import { useQuery, useMutation } from '@apollo/react-hooks'

import { Switch } from '@blueprintjs/core'

import { NewRecipesButton } from './components/NewRecipeButton/NewRecipeButton'
import { RecipeCard } from './components/RecipeCard/RecipeCard'
import { RecipeDialog } from './components/RecipeDialog/RecipeDialog'

import './Recipes.css'

import RECIPES_QUERY from 'queries/recipes.graphql'

import CREATE_RECIPE_MUTATION from 'mutations/createRecipe.graphql'
import DELETE_RECIPE_MUTATION from 'mutations/deleteRecipe.graphql'

const Receipts = () => {
  const [isEditMode, setEditMode] = useState(false)
  const [isDialogOpen, setDialogVisibility] = useState(false)
  const [editId, setEditId] = useState(null)

  const { data, loading } = useQuery(RECIPES_QUERY)
  const recipes = get(data, 'recipes', [])

  const [createRecipe, { loading: createLoading }] = useMutation(CREATE_RECIPE_MUTATION, {
    refetchQueries: [{ query: RECIPES_QUERY }],
  })

  const [deleteRecipe, { loading: deleteLoading }] = useMutation(DELETE_RECIPE_MUTATION, {
    refetchQueries: [{ query: RECIPES_QUERY }],
  })

  const handleEditModeChange = () => setEditMode(!isEditMode)

  const openEditDialog = (id) => {
    setEditId(id)
    setDialogVisibility(true)
  }

  const handleCreate = () => {
    createRecipe({ variables: { name: 'New receipt', description: 'New receipt' } })
  }

  const closeDialog = () => setDialogVisibility(false)

  const handleReceiptDelete = (id) => deleteRecipe({ variables: { id } })

  const isLoading = loading || createLoading || deleteLoading

  return (
    <>
      <div styleName="controls_panel">
        <Switch label="Edit" large checked={isEditMode} onChange={handleEditModeChange} />
      </div>
      <div styleName="container">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            isLoading={isLoading}
            isEditMode={isEditMode}
            handleDelete={handleReceiptDelete}
            handleEdit={openEditDialog}
            editId={editId}
          />
        ))}
        {isEditMode && <NewRecipesButton onClick={handleCreate} />}
      </div>
      <RecipeDialog isOpen={isDialogOpen} onClose={closeDialog} />
    </>
  )
}

export default Receipts
