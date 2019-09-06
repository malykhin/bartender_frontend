import React from 'react'
import { bool, func, object } from 'prop-types'
import cn from 'classnames'

import { Card, Button, H4, Text, Elevation, Classes, Intent } from '@blueprintjs/core'

import styles from './RecipeCard.css'

export const RecipeCard = ({ recipe, isLoading, isEditMode, handleDelete, handleEdit }) => {
  return (
    <Card className={cn(styles.card, { 'bp3-interactive': !isEditMode })} elevation={Elevation.TWO}>
      <div>
        <H4 className={cn({ [Classes.SKELETON]: isLoading })}>{recipe.name}</H4>
        <Text className={cn({ [Classes.SKELETON]: isLoading })}>{recipe.description}</Text>
      </div>
      {isEditMode && (
        <div styleName="buttons_wrapper">
          <Button
            className={cn({ [Classes.SKELETON]: isLoading })}
            icon="trash"
            intent={Intent.DANGER}
            onClick={handleDelete}
          />
          <Button
            className={cn({ [Classes.SKELETON]: isLoading })}
            icon="edit"
            intent={Intent.PRIMARY}
            onClick={handleEdit}
          />
        </div>
      )}
    </Card>
  )
}

RecipeCard.propTypes = {
  isEditMode: bool.isRequired,
  isLoading: bool.isRequired,
  handleDelete: func.isRequired,
  handleEdit: func.isRequired,
  recipe: object.isRequired,
}
