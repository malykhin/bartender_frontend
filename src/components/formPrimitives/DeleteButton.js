import React from 'react'
import { bool } from 'prop-types'

import { Button, Intent, Classes } from '@blueprintjs/core'
import cn from 'classnames'

import styles from './styles.css'

export const DeleteButton = ({ isLoading, ...props }) => (
  <Button
    {...props}
    className={cn(styles.delete_button, { [Classes.SKELETON]: isLoading })}
    intent={Intent.DANGER}
    icon="cross"
  >
    Delete
  </Button>
)

DeleteButton.defaultProps = {
  isLoading: false,
}

DeleteButton.propTypes = {
  isLoading: bool,
}
