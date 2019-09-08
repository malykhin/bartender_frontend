import React, { useState } from 'react'
import { object, bool, array, func } from 'prop-types'
import cn from 'classnames'
import { isEqual } from 'lodash'

import { Button, Intent, Classes } from '@blueprintjs/core'

import { Select } from 'components/formPrimitives/Select'
import { NumInput } from 'components/formPrimitives/NumInput'

import styles from './Ingredient.css'

export const Ingredient = ({ liquids, isLoading, ingredient, handleDelete, handleSubmit }) => {
  const [form, setForm] = useState(ingredient)

  const deleteHandler = () => handleDelete(ingredient.id)
  const submitHandler = () => handleSubmit(form)

  const isSubmitDisabled = !form.liquidId || !form.volume || isEqual(form, ingredient)

  return (
    <div styleName="row">
      <Select
        isLoading={isLoading}
        form={form}
        options={liquids}
        onChange={setForm}
        placeholder="Liquid"
        icon="glass"
        name="liquidId"
      />
      <NumInput isLoading={isLoading} form={form} onChange={setForm} placeholder="Volume, ml" name="volume" />
      <Button
        className={cn(styles.small_button, { [Classes.SKELETON]: isLoading })}
        icon="trash"
        intent={Intent.DANGER}
        onClick={deleteHandler}
      />
      <Button
        className={cn(styles.small_button, { [Classes.SKELETON]: isLoading })}
        icon="tick"
        intent={Intent.SUCCESS}
        onClick={submitHandler}
        disabled={isSubmitDisabled}
      />
    </div>
  )
}

Ingredient.propTypes = {
  liquids: array.isRequired,
  ingredient: object.isRequired,
  isLoading: bool.isRequired,
  handleDelete: func.isRequired,
  handleSubmit: func.isRequired,
}
