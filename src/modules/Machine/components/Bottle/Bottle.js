import React from 'react'
import { number, func, object } from 'prop-types'

import './Bottle.css'

const STEP = 52
const OFFSET = 684

export const Bottle = ({ index, slot, handleShowTooltip, handleHideTooltip, handleSlotClick }) => {
  const xBottlePosition = OFFSET - 174 - index * STEP
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="8.9949mm"
      height="29.7816mm"
      version="1.1"
      styleName="container"
      viewBox="0 0 64.95 215.03"
      style={{ left: xBottlePosition }}
      onMouseEnter={() =>
        handleShowTooltip({
          isVisible: true,
          content: `Slot ${slot.name}`,
          x: xBottlePosition,
          y: -72,
        })
      }
      onMouseLeave={handleHideTooltip}
      onClick={handleSlotClick}
    >
      <g>
        <polygon
          styleName="bottle_shape"
          points="61.34,3.61 3.61,3.61 3.61,165.24 20.93,165.24 20.93,211.42 44.02,211.42 44.02,165.24 61.34,165.24 "
        />
      </g>
    </svg>
  )
}

Bottle.propTypes = {
  index: number.isRequired,
  handleShowTooltip: func.isRequired,
  handleHideTooltip: func.isRequired,
  handleSlotClick: func.isRequired,
  slot: object.isRequired,
}
