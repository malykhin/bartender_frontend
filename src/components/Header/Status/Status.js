import React from 'react'
import { string } from 'prop-types'

import './Status.css'

const Status = ({ machineStatus }) => {
  return <div styleName={machineStatus}>{machineStatus}</div>
}

Status.defaultProps = {
  machineStatus: '',
}

Status.propTypes = {
  machineStatus: string,
}

export default Status
