import React, { useState } from 'react'
import { object, bool, func } from 'prop-types'

import { Card, H4, Elevation, Button, Intent } from '@blueprintjs/core'

import { TextInput } from '../../../../components/formPrimitives/TextInput'

import styles from './LiquidCard.css'

export const LiquidCard = ({ liquid, editMode, handleDelete, handleEdit }) => {
  const [isEditMode, setEditMode] = useState(editMode)
  const [form, setForm] = useState({})

  const onEdit = (form) => {
    handleEdit(form)
    !editMode && setEditMode(false)
  }

  return (
    <Card className={styles.card} elevation={Elevation.TWO}>
      {isEditMode ? (
        <TextInput form={form} onChange={setForm} placeholder="Name" name="name" inline />
      ) : (
        <H4>{liquid.name}</H4>
      )}
      {isEditMode ? (
        <TextInput form={form} onChange={setForm} placeholder="Description" name="description" inline />
      ) : (
        <div>{liquid.description}</div>
      )}
      <div styleName="buttons_wrapper">
        {!isEditMode && <Button icon="trash" intent={Intent.DANGER} onClick={handleDelete} />}
        {isEditMode ? (
          <Button icon="tick" intent={Intent.PRIMARY} onClick={onEdit} />
        ) : (
          <Button icon="edit" intent={Intent.PRIMARY} onClick={() => setEditMode(true)} />
        )}
      </div>
    </Card>
  )
}

LiquidCard.defaultProps = {
  editMode: false,
}

LiquidCard.propTypes = {
  liquid: object.isRequired,
  handleDelete: func.isRequired,
  handleEdit: func.isRequired,
  editMode: bool,
}
