import React from 'react'
import { bool } from 'prop-types'
import cn from 'classnames'

import { Button, Intent, Classes } from '@blueprintjs/core'

import styles from './styles.css'

export const SaveButton = ({ isLoading, ...props }) => (
  <Button
    {...props}
    className={cn(styles.save_button, { [Classes.SKELETON]: isLoading })}
    intent={Intent.PRIMARY}
    icon="tick"
  >
    Save
  </Button>
)

SaveButton.defaultProps = {
  isLoading: false,
}

SaveButton.propTypes = {
  isLoading: bool,
}
