import React from 'react'
import { get } from 'lodash'
import { useQuery, useMutation } from '@apollo/react-hooks'

import { LiquidCard } from './components/LiquidCard/LiquidCard'

import './Liquids.css'

import LIQUIDS_QUERY from '../../queries/liquids.graphql'

import CREATE_LIQUID_MUTATION from '../../mutations/createLiquid.graphql'
import DELETE_LIQUID_MUTATION from '../../mutations/deleteLiquid.graphql'

const Liquids = () => {
  const { data, loading } = useQuery(LIQUIDS_QUERY)
  let liquids = get(data, 'liquids', [])

  const [createLiquid, { loading: createLoading }] = useMutation(CREATE_LIQUID_MUTATION, {
    refetchQueries: [{ query: LIQUIDS_QUERY }],
  })
  const [deleteLiquid, { loading: deleteLoading }] = useMutation(DELETE_LIQUID_MUTATION, {
    refetchQueries: [{ query: LIQUIDS_QUERY }],
  })

  const isLoading = loading || createLoading || deleteLoading
  return (
    <div styleName="container">
      {liquids.map((liquid) => (
        <LiquidCard
          key={liquid.id}
          liquid={liquid}
          isLoading={isLoading}
          handleDelete={() => deleteLiquid({ variables: { id: liquid.id } })}
          handleEdit={() => {}}
        />
      ))}
      <LiquidCard isLoading={isLoading} handleCreate={createLiquid} isCreate />
    </div>
  )
}

export default Liquids
