import React from 'react'
import { object, bool, func } from 'prop-types'
import cn from 'classnames'

import { Card, H4, Elevation, Button, Text, Intent, Classes } from '@blueprintjs/core'

import styles from './LiquidCard.css'

export const LiquidCard = ({ liquid, handleDelete, handleEdit, isLoading }) => {
  const onDelete = () => handleDelete(liquid)
  const editHandler = () => handleEdit(liquid.id)
  return (
    <Card className={styles.card} elevation={Elevation.TWO}>
      <H4 className={cn({ [Classes.SKELETON]: isLoading })}>{liquid.name}</H4>
      <Text className={cn({ [Classes.SKELETON]: isLoading })}>{liquid.description}</Text>
      <div styleName="buttons_wrapper">
        <Button
          className={cn({ [Classes.SKELETON]: isLoading })}
          icon="trash"
          intent={Intent.DANGER}
          onClick={onDelete}
        />
        <Button
          className={cn({ [Classes.SKELETON]: isLoading })}
          icon="edit"
          intent={Intent.PRIMARY}
          onClick={editHandler}
        />
      </div>
    </Card>
  )
}

LiquidCard.defaultProps = {
  liquid: {},
  isCreate: false,
  isLoading: false,
  handleCreate: () => {},
  handleEdit: () => {},
  handleDelete: () => {},
}

LiquidCard.propTypes = {
  liquid: object,
  handleDelete: func,
  handleEdit: func,
  handleCreate: func,
  isCreate: bool,
  isLoading: bool,
}
