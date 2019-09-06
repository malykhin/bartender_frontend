import React from 'react'
import { func } from 'prop-types'

import cn from 'classnames'

import { Card, Icon, Elevation } from '@blueprintjs/core'

import styles from './NewRecipeButton.css'

export const NewRecipesButton = ({ onClick }) => (
  <Card onClick={onClick} className={cn(styles.card, 'bp3-interactive')} elevation={Elevation.TWO}>
    <Icon icon="plus" iconSize={40} />
  </Card>
)

NewRecipesButton.propTypes = {
  onClick: func.isRequired,
}
