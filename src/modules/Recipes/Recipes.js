import React, { useState } from 'react'
import { get } from 'lodash'

import { useQuery } from '@apollo/react-hooks'

import { Switch } from '@blueprintjs/core'

import { NewRecipesButton } from './components/NewRecipeButton/NewRecipeButton'
import { RecipeCard } from './components/RecipeCard/RecipeCard'
import { RecipeDialog } from './components/RecipeDialog/RecipeDialog'

import './Recipes.css'

import RECIPES_QUERY from 'queries/recipes.graphql'

const Receipts = () => {
  const [isEditMode, setEditMode] = useState(false)
  const [isDialogOpen, setDialogVisibility] = useState(false)
  const [editId, setEditId] = useState(null)

  const { data, loading } = useQuery(RECIPES_QUERY)
  const recipes = get(data, 'recipes', [])

  const handleEditModeChange = () => setEditMode(!isEditMode)

  const openEditDialog = (id) => {
    setEditId(id)
    setDialogVisibility(true)
  }

  const openCreateDialog = () => {
    setEditId(null)
    setDialogVisibility(true)
  }

  const closeDialog = () => setDialogVisibility(false)

  const handleReceiptDelete = () => {}

  const isLoading = loading
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
        {isEditMode && <NewRecipesButton onClick={openCreateDialog} />}
      </div>
      <RecipeDialog isOpen={isDialogOpen} onClose={closeDialog} />
    </>
  )
}

export default Receipts
