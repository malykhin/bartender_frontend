import React from 'react'
import { string, array, func, object, bool } from 'prop-types'
import { chain } from 'lodash'

import { MenuItem, Button, FormGroup, Classes } from '@blueprintjs/core'
import { Select as RawSelect } from '@blueprintjs/select'

import styles from './styles.css'

export const renderOption = (option, { handleClick, modifiers }) => {
  if (!modifiers.matchesPredicate) {
    return null
  }
  return (
    <MenuItem
      active={modifiers.active}
      disabled={modifiers.disabled}
      key={option.id}
      onClick={handleClick}
      text={option.name}
      label=""
    />
  )
}

export const filterOption = (query, option, _index, exactMatch) => {
  const normalizedName = option.name.toLowerCase()
  const normalizedQuery = query.toLowerCase()

  if (exactMatch) {
    return normalizedName === normalizedQuery
  } else {
    return normalizedName.indexOf(normalizedQuery) >= 0
  }
}

export const Select = ({ placeholder, icon, options, onChange, form, name, isLoading }) => {
  const handleSelect = ({ id }) => onChange({ ...form, [name]: id })
  const label = chain(options)
    .find((option) => option.id === form[name])
    .get('name', placeholder)
    .value()

  return (
    <FormGroup className={isLoading && Classes.SKELETON} label={placeholder}>
      <RawSelect
        onItemSelect={handleSelect}
        className={styles.wide}
        items={options}
        itemRenderer={renderOption}
        itemPredicate={filterOption}
        noResults={<MenuItem disabled={true} text="No results." popoverProps={{ className: styles.wide }} />}
      >
        <Button className={styles.wide} icon={icon} rightIcon="caret-down" text={label} />
      </RawSelect>
    </FormGroup>
  )
}

Select.defaultProps = {
  isLoading: false,
}

Select.propTypes = {
  placeholder: string.isRequired,
  options: array.isRequired,
  icon: string.isRequired,
  onChange: func.isRequired,
  name: string.isRequired,
  form: object.isRequired,
  isLoading: bool,
}
