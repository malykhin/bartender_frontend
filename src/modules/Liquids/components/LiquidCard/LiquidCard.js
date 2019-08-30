import React, { useState } from 'react'
import { object, bool, func } from 'prop-types'
import cn from 'classnames'
import { Card, H4, Elevation, Button, Text, Intent, Classes } from '@blueprintjs/core'

import { TextInput } from 'components/formPrimitives/TextInput'

import styles from './LiquidCard.css'

export const LiquidCard = ({ liquid, isCreate, handleDelete, handleEdit, handleCreate, isLoading }) => {
  const [isEditMode, setEditMode] = useState(isCreate)
  const [form, setForm] = useState(liquid)

  const onEdit = () => {
    handleEdit({ variables: form })
    !isCreate && setEditMode(false)
  }

  const onCreate = () => {
    handleCreate({ variables: form })
    setForm({})
  }

  const handleCancel = () => {
    setEditMode(false)
    setForm(liquid)
  }

  return (
    <Card className={styles.card} elevation={Elevation.TWO}>
      {isEditMode ? (
        <TextInput isLoading={isLoading} form={form} onChange={setForm} placeholder="Name" name="name" inline />
      ) : (
        <H4 className={cn({ [Classes.SKELETON]: isLoading })}>{liquid.name}</H4>
      )}
      {isEditMode ? (
        <TextInput
          isLoading={isLoading}
          form={form}
          onChange={setForm}
          placeholder="Description"
          name="description"
          inline
        />
      ) : (
        <Text className={cn({ [Classes.SKELETON]: isLoading })}>{liquid.description}</Text>
      )}
      <div styleName="buttons_wrapper">
        {isEditMode ? (
          <>
            {!isCreate && (
              <Button
                className={cn({ [Classes.SKELETON]: isLoading })}
                icon="disable"
                intent={Intent.DANGER}
                onClick={handleCancel}
              />
            )}
            <Button
              className={cn({ [Classes.SKELETON]: isLoading })}
              icon="tick"
              intent={Intent.PRIMARY}
              onClick={isCreate ? onCreate : onEdit}
            />
          </>
        ) : (
          <>
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
              onClick={() => setEditMode(true)}
            />
          </>
        )}
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
