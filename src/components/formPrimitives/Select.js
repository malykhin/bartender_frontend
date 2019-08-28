import React from 'react'
import { MenuItem, Button, FormGroup } from '@blueprintjs/core'
import { Select as RawSelect } from '@blueprintjs/select'

import { string } from 'prop-types'

import styles from './styles.css'

export const Select = ({ placeholder, icon }) => (
  <FormGroup label={placeholder}>
    <RawSelect
      className={styles.wide}
      items={[]}
      noResults={<MenuItem disabled={true} text="No results." popoverProps={{ className: styles.wide }} />}
    >
      <Button className={styles.wide} icon={icon} rightIcon="caret-down" text={placeholder} />
    </RawSelect>
  </FormGroup>
)

Select.propTypes = {
  placeholder: string.isRequired,
  icon: string.isRequired,
}
