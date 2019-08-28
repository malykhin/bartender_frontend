import React from 'react'
import { Button, Intent } from '@blueprintjs/core'

import styles from './styles.css'

export const SaveButton = ({ ...props }) => (
  <Button {...props} className={styles.save_button} intent={Intent.PRIMARY} icon="tick">
    Save
  </Button>
)
