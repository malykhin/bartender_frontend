import React from 'react'
import { func, string } from 'prop-types'
import cn from 'classnames'

import { controlTypes } from '../../constants'

import './MachineSchema.css'

export const MachineSchema = ({
  handleShowTooltip,
  handleHideTooltip,
  handleAxisClick,
  handleDozerClick,
  handleHomePositionClick,
  handleFinalPositionClick,
  handleSlotsClick,
  selectedType,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="181.217mm"
    height="53.6922mm"
    version="1.1"
    styleName="container"
    viewBox="0 0 17299.57 5125.64"
  >
    <g>
      <line styleName="fil0 str0" x1="4058.08" y1="2149.15" x2="47.73" y2="4464.52" />
      <line styleName="fil0 str0" x1="13241.49" y1="2149.15" x2="17251.84" y2="4464.52" />
      <line styleName="fil0 str0" x1="47.73" y1="4464.52" x2="17251.84" y2="4464.52" />
      <line styleName="fil0 str0" x1="4058.08" y1="2149.15" x2="13252.39" y2="2149.15" />
      <path styleName="fil0 str0" d="M13819.88 3046.04l-1551.85 0m-745.5 0l-8081.82 0" />
      <line styleName="fil0 str0" x1="14796.61" y1="3046.04" x2="14408.06" y2="3046.04" />
      <line styleName="fil0 str0" x1="14796.61" y1="941.99" x2="14796.61" y2="3046.04" />
      <line styleName="fil0 str0" x1="2510.09" y1="3046.04" x2="2510.09" y2="941.99" />
      <line styleName="fil0 str0" x1="2853.43" y1="3046.04" x2="2510.09" y2="3046.04" />
      <polygon
        styleName={cn('fil0', 'str0', 'hoverable', { selected: selectedType === controlTypes.HOME_POSITION })}
        points="14873.27,3331.16 14225.55,2934.19 13655.1,2933.56 14237.58,3331.16"
        onMouseEnter={() =>
          handleShowTooltip({
            isVisible: true,
            content: 'Home position',
            x: 540,
            y: 80,
          })
        }
        onMouseLeave={handleHideTooltip}
        onClick={handleHomePositionClick}
      />
      <polygon
        styleName={cn('fil0', 'str0', 'hoverable', { selected: selectedType === controlTypes.FINAL_POSITION })}
        points="3623.13,2922.45 3011.31,3336.94 2375.62,3336.94 3057.44,2921.82"
        onMouseEnter={() =>
          handleShowTooltip({
            isVisible: true,
            content: 'Final position',
            x: 116,
            y: 80,
          })
        }
        onMouseLeave={handleHideTooltip}
        onClick={handleFinalPositionClick}
      />
      <rect
        styleName={cn('fil0', 'str0', 'hoverable', { selected: selectedType === controlTypes.AXIS })}
        x="47.73"
        y="4487.57"
        width="17204.11"
        height="590.34"
        onMouseEnter={() =>
          handleShowTooltip({
            isVisible: true,
            content: 'Axis',
            x: 300,
            y: 142,
          })
        }
        onMouseLeave={handleHideTooltip}
        onClick={handleAxisClick}
      />
      <rect
        styleName={cn('fil0', 'str0', 'hoverable', { selected: selectedType === controlTypes.SLOTS })}
        x="2510.08"
        y="47.73"
        width="12286.53"
        height="894.26"
        onMouseEnter={() =>
          handleShowTooltip({
            isVisible: true,
            content: 'Create slots',
            x: 550,
            y: -34,
          })
        }
        onMouseLeave={handleHideTooltip}
        onClick={handleSlotsClick}
      />
      <polygon
        styleName={cn('fil0', 'str0', 'hoverable', { selected: selectedType === controlTypes.DOZER })}
        points="12225.84,3341.42 12358.04,2415.85 11432.49,2415.85 11564.73,3341.42 "
        onMouseEnter={() =>
          handleShowTooltip({
            isVisible: true,
            content: 'Dozer',
            x: 456,
            y: 60,
          })
        }
        onMouseLeave={handleHideTooltip}
        onClick={handleDozerClick}
      />
    </g>
  </svg>
)

MachineSchema.propTypes = {
  handleShowTooltip: func.isRequired,
  handleHideTooltip: func.isRequired,
  handleAxisClick: func.isRequired,
  handleDozerClick: func.isRequired,
  handleHomePositionClick: func.isRequired,
  handleFinalPositionClick: func.isRequired,
  handleSlotsClick: func.isRequired,
  selectedType: string.isRequired,
}
