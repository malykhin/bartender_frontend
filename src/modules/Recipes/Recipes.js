import React, { useState } from 'react'
import { get } from 'lodash'

import { useQuery, useMutation } from '@apollo/react-hooks'

import { Switch } from '@blueprintjs/core'

import { NewCardButton } from 'components/NewCardButton/NewCardButton'
import { RecipeCard } from './components/RecipeCard/RecipeCard'
import { RecipeDialog } from './components/RecipeDialog/RecipeDialog'

import './Recipes.css'

import RECIPES_QUERY from 'queries/recipes.graphql'
import LIQUIDS_FOR_SELECT_QUERY from 'queries/liquidsForSelect.graphql'

import CREATE_RECIPE_MUTATION from 'mutations/createRecipe.graphql'
import EDIT_RECIPE_MUTATION from 'mutations/editRecipe.graphql'
import DELETE_RECIPE_MUTATION from 'mutations/deleteRecipe.graphql'

const Recipes = () => {
  const [isEditMode, setEditMode] = useState(false)
  const [isDialogOpen, setDialogVisibility] = useState(false)
  const [editId, setEditId] = useState(null)

  const { data, loading } = useQuery(RECIPES_QUERY)
  const { data: liquidsData, loading: liquidsLoading } = useQuery(LIQUIDS_FOR_SELECT_QUERY)

  const recipes = get(data, 'recipes', [])
  const liquids = get(liquidsData, 'liquids', [])

  const [createRecipe, { loading: createLoading }] = useMutation(CREATE_RECIPE_MUTATION, {
    refetchQueries: [{ query: RECIPES_QUERY }],
  })

  const [editRecipe, { loading: editLoading }] = useMutation(EDIT_RECIPE_MUTATION, {
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
    createRecipe({ variables: { name: 'New recipe', description: 'New recipe' } })
  }

  const handleEdit = (liquid) => {
    editRecipe({ variables: liquid })
    closeDialog()
  }

  const closeDialog = () => setDialogVisibility(false)

  const handleRecipeDelete = (id) => deleteRecipe({ variables: { id } })

  const isLoading = loading || createLoading || editLoading || deleteLoading || liquidsLoading

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
            handleDelete={handleRecipeDelete}
            handleEdit={openEditDialog}
          />
        ))}
        {isEditMode && <NewCardButton onClick={handleCreate} />}
      </div>
      {editId && (
        <RecipeDialog
          isOpen={isDialogOpen}
          onClose={closeDialog}
          editId={editId}
          handleEdit={handleEdit}
          liquids={liquids}
        />
      )}
    </>
  )
}

export default Recipes
