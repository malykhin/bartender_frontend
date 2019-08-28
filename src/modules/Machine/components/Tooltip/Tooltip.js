import React from 'react'
import { object } from 'prop-types'

import './Tooltip.css'

export const Tooltip = ({ tooltip: { isVisible, content, x, y } }) =>
  isVisible ? (
    <div styleName="wrapper" style={{ left: x, top: y }}>
      <div styleName="tooltip_text">{content}</div>
    </div>
  ) : null

Tooltip.propTypes = {
  tooltip: object.isRequired,
}
