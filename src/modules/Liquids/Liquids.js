import React from 'react'
import { get } from 'lodash'
import { useQuery } from '@apollo/react-hooks'

import { LiquidCard } from './components/LiquidCard/LiquidCard'

import './Liquids.css'

import LIQUIDS_QUERY from '../../queries/liquids.graphql'

const Liquids = () => {
  const { data } = useQuery(LIQUIDS_QUERY)
  const liquids = get(data, 'liquids', [])

  return (
    <div styleName="container">
      {liquids.map((liquid) => (
        <LiquidCard key={liquid.id} liquid={liquid} handleDelete={() => {}} handleEdit={() => {}} />
      ))}
      <LiquidCard liquid={{}} handleDelete={() => {}} handleEdit={() => {}} editMode />
    </div>
  )
}

export default Liquids
