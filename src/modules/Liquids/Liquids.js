import React, { useState } from 'react'
import { get } from 'lodash'

import { useQuery, useMutation } from '@apollo/react-hooks'

import { NewCardButton } from 'components/NewCardButton/NewCardButton'
import { LiquidCard } from './components/LiquidCard/LiquidCard'
import { LiquidDialog } from './components/LiquidDialog/LiquidDialog'

import './Liquids.css'

import LIQUIDS_QUERY from 'queries/liquids.graphql'
import LIQUIDS_FOR_SELECT_QUERY from 'queries/liquidsForSelect.graphql'

import CREATE_LIQUID_MUTATION from 'mutations/createLiquid.graphql'
import EDIT_LIQUID_MUTATION from 'mutations/editLiquid.graphql'
import DELETE_LIQUID_MUTATION from 'mutations/deleteLiquid.graphql'

const Liquids = () => {
  const [isDialogOpen, setDialogVisibility] = useState(false)
  const [editId, setEditId] = useState(null)
  const { data, loading } = useQuery(LIQUIDS_QUERY)
  const liquids = get(data, 'liquids', [])

  const [createLiquid, { loading: createLoading }] = useMutation(CREATE_LIQUID_MUTATION, {
    refetchQueries: [{ query: LIQUIDS_QUERY }, { query: LIQUIDS_FOR_SELECT_QUERY }],
  })
  const [editLiquid, { loading: editLoading }] = useMutation(EDIT_LIQUID_MUTATION, {
    refetchQueries: [{ query: LIQUIDS_QUERY }, { query: LIQUIDS_FOR_SELECT_QUERY }],
  })
  const [deleteLiquid, { loading: deleteLoading }] = useMutation(DELETE_LIQUID_MUTATION, {
    refetchQueries: [{ query: LIQUIDS_QUERY }, { query: LIQUIDS_FOR_SELECT_QUERY }],
  })

  const openEditDialog = (id) => {
    setEditId(id)
    setDialogVisibility(true)
  }

  const handleCreate = () => {
    createLiquid({ variables: { name: 'New liquid', description: 'New liquid' } })
  }

  const closeDialog = () => setDialogVisibility(false)

  const handleEdit = (liquid) => {
    editLiquid({ variables: liquid })
    closeDialog()
  }

  const handleDelete = ({ id }) => deleteLiquid({ variables: { id } })

  const isLoading = loading || createLoading || editLoading || deleteLoading

  return (
    <div styleName="container">
      {liquids.map((liquid) => (
        <LiquidCard
          key={liquid.id}
          liquid={liquid}
          isLoading={isLoading}
          handleDelete={handleDelete}
          handleEdit={openEditDialog}
        />
      ))}
      <NewCardButton onClick={handleCreate} />
      {editId && <LiquidDialog isOpen={isDialogOpen} onClose={closeDialog} editId={editId} handleEdit={handleEdit} />}
    </div>
  )
}

export default Liquids
