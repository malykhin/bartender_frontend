import React from 'react'
import { Button, Intent } from '@blueprintjs/core'

import styles from './styles.css'

export const DeleteButton = ({ ...props }) => (
  <Button {...props} className={styles.delete_button} intent={Intent.DANGER} icon="cross">
    Delete
  </Button>
)
