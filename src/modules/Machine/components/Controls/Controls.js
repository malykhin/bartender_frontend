import React from 'react'
import { object } from 'prop-types'

import { controlTypes } from '../../constants'

import { FinalPosition } from './Forms/FinalPosition'
import { HomePosition } from './Forms/HomePosition'
import { Axis } from './Forms/Axis'
import { Dozer } from './Forms/Dozer'
import { Slot } from './Forms/Slot'
import { Slots } from './Forms/Slots'
import { Default } from './Forms/Default'

import './Controls.css'

const formMap = {
  [controlTypes.AXIS]: Axis,
  [controlTypes.DOZER]: Dozer,
  [controlTypes.FINAL_POSITION]: FinalPosition,
  [controlTypes.HOME_POSITION]: HomePosition,
  [controlTypes.SLOT]: Slot,
  [controlTypes.SLOTS]: Slots,
}

export const Controls = ({ control: { type } }) => {
  const Form = formMap[type] || Default
  return <Form />
}

Controls.propTypes = {
  control: object.isRequired,
}
