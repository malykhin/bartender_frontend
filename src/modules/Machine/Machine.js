import React, { useState, useCallback } from 'react'
import { isNumber, isString, get } from 'lodash'
import { useQuery } from '@apollo/react-hooks'

import { MachineSchema } from './components/MachineSchema/MachineSchema'
import { Bottle } from './components/Bottle/Bottle'
import { Tooltip } from './components/Tooltip/Tooltip'
import { Controls } from './components/Controls/Controls'

import { controlTypes, initialTooltipState, initialControlState } from './constants'

import SLOTS_QUERY from '../../queries/slots.graphql'

import './Machine.css'

const Machine = () => {
  const [tooltip, setTooltip] = useState(initialTooltipState)
  const [control, setControl] = useState(initialControlState)

  const { data } = useQuery(SLOTS_QUERY)
  const slots = get(data, 'slots', [])

  const hideTooltip = useCallback(() => {
    setTooltip(initialTooltipState)
  }, [initialTooltipState])

  const handleSetControls = (type) => (id) => {
    const entityId = isNumber(id) || isString(id) ? id : null
    setControl({ id: entityId, type })
  }

  return (
    <div styleName="content">
      <div styleName="schema_container">
        <MachineSchema
          handleAxisClick={handleSetControls(controlTypes.AXIS)}
          handleDozerClick={handleSetControls(controlTypes.DOZER)}
          handleHomePositionClick={handleSetControls(controlTypes.HOME_POSITION)}
          handleFinalPositionClick={handleSetControls(controlTypes.FINAL_POSITION)}
          handleSlotsClick={handleSetControls(controlTypes.SLOTS)}
          handleShowTooltip={setTooltip}
          handleHideTooltip={hideTooltip}
        />
        {slots.map((slot, index) => (
          <Bottle
            key={slot.id}
            index={index}
            slot={slot}
            handleShowTooltip={setTooltip}
            handleHideTooltip={hideTooltip}
            handleSlotClick={() => handleSetControls(controlTypes.SLOT)(slot.id)}
          />
        ))}
        <Tooltip tooltip={tooltip} />
      </div>
      <div styleName="divider" />
      <Controls control={control} />
    </div>
  )
}

export default Machine
