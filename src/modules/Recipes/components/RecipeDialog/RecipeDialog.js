import React, { useState, useMemo } from 'react'
import { bool, func, string, array } from 'prop-types'

import { useQuery, useMutation } from '@apollo/react-hooks'
import { get } from 'lodash'

import { Dialog, Label, Button } from '@blueprintjs/core'

import { TextInput } from 'components/formPrimitives/TextInput'
import { SaveButton } from 'components/formPrimitives/SaveButton'

import { Ingredient } from '../Ingredient/Ingredient'

import styles from './RecipeDialog.css'

import RECIPE_QUERY from 'queries/recipe.graphql'

import CREATE_INGREDIENT_MUTATION from 'mutations/createIngredient.graphql'
import DELETE_INGREDIENT_MUTATION from 'mutations/deleteIngredient.graphql'
import EDIT_INGREDIENT_MUTATION from 'mutations/editIngredient.graphql'

export const RecipeDialog = ({ isOpen, onClose, editId, handleEdit, liquids }) => {
  const [form, setForm] = useState({})
  const { data, loading } = useQuery(RECIPE_QUERY, { variables: { recipeId: editId } })

  const [createIngredient, { loading: createLoading }] = useMutation(CREATE_INGREDIENT_MUTATION, {
    refetchQueries: [{ query: RECIPE_QUERY, variables: { recipeId: editId } }],
  })

  const [deleteIngredient, { loading: deleteLoading }] = useMutation(DELETE_INGREDIENT_MUTATION, {
    refetchQueries: [{ query: RECIPE_QUERY, variables: { recipeId: editId } }],
  })

  const [editIngredient, { loading: editLoading }] = useMutation(EDIT_INGREDIENT_MUTATION, {
    refetchQueries: [{ query: RECIPE_QUERY, variables: { recipeId: editId } }],
  })

  const recipe = get(data, 'recipe', {})
  const ingredients = get(recipe, 'ingredients', [])

  useMemo(() => {
    setForm(recipe)
  }, [data])

  const isLoading = loading || createLoading || deleteLoading || editLoading

  const editHandler = () => handleEdit(form)
  const addIngredient = () => createIngredient({ variables: { recipeId: editId } })
  const handleIngredientDelete = (ingredientId) => deleteIngredient({ variables: { ingredientId } })
  const handleIngredientEdit = (ingredient) => editIngredient({ variables: ingredient })

  return (
    <Dialog className={styles.dialog} icon="filter" onClose={onClose} title={'Recipe'} isOpen={isOpen}>
      <div styleName="container">
        <TextInput isLoading={isLoading} form={form} onChange={setForm} placeholder="Name" name="name" />
        <TextInput isLoading={isLoading} form={form} onChange={setForm} placeholder="Description" name="description" />
        <Label>Ingredients</Label>
        {ingredients.map((ingredient) => (
          <Ingredient
            key={ingredient.id}
            isLoading={isLoading}
            ingredient={ingredient}
            liquids={liquids}
            handleDelete={handleIngredientDelete}
            handleSubmit={handleIngredientEdit}
          />
        ))}
        <Button onClick={addIngredient} styleName="add" icon="add" minimal large />
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
  liquids: array.isRequired,
}
