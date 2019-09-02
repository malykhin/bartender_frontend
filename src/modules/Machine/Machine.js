import React, { useState, useCallback } from 'react'
import { isNumber, isString, get } from 'lodash'
import { useQuery } from '@apollo/react-hooks'

import { Spinner } from '@blueprintjs/core'

import { MachineSchema } from './components/MachineSchema/MachineSchema'
import { Bottle } from './components/Bottle/Bottle'
import { Tooltip } from './components/Tooltip/Tooltip'
import { Controls } from './components/Controls/Controls'

import { controlTypes, initialTooltipState, initialControlState } from './constants'

import SLOTS_QUERY from 'queries/slots.graphql'
import LIQUIDS_FOR_SELECT_QUERY from 'queries/liquidsForSelect.graphql'

import './Machine.css'

const Machine = () => {
  const [tooltip, setTooltip] = useState(initialTooltipState)
  const [control, setControl] = useState(initialControlState)

  const { data, loading } = useQuery(SLOTS_QUERY)
  const { data: liquidsData, loading: liquidsLoading } = useQuery(LIQUIDS_FOR_SELECT_QUERY)
  const slots = get(data, 'slots', [])
  const liquids = get(liquidsData, 'liquids', [])

  const hideTooltip = useCallback(() => {
    setTooltip(initialTooltipState)
  }, [initialTooltipState])

  const handleSetControls = (type) => (id) => {
    const entityId = isNumber(id) || isString(id) ? id : null
    setControl({ id: entityId, type })
  }

  const isLoading = loading || liquidsLoading

  return (
    <div styleName="content">
      {isLoading ? (
        <div styleName="loader_container">
          <Spinner />
        </div>
      ) : (
        <div styleName="schema_container">
          <MachineSchema
            handleAxisClick={handleSetControls(controlTypes.AXIS)}
            handleDozerClick={handleSetControls(controlTypes.DOZER)}
            handleHomePositionClick={handleSetControls(controlTypes.HOME_POSITION)}
            handleFinalPositionClick={handleSetControls(controlTypes.FINAL_POSITION)}
            handleSlotsClick={handleSetControls(controlTypes.SLOTS)}
            handleShowTooltip={setTooltip}
            handleHideTooltip={hideTooltip}
            selectedType={control.type || ''}
          />
          {slots.map((slot, index) => (
            <Bottle
              key={slot.id}
              index={index}
              slot={slot}
              handleShowTooltip={setTooltip}
              handleHideTooltip={hideTooltip}
              handleSlotClick={() => handleSetControls(controlTypes.SLOT)(slot.id)}
              selected={control.type === controlTypes.SLOT && control.id === slot.id}
            />
          ))}
          <Tooltip tooltip={tooltip} />
        </div>
      )}
      <div styleName="divider" />
      <Controls control={control} liquids={liquids} setDefaultView={handleSetControls(null)} />
    </div>
  )
}

export default Machine
