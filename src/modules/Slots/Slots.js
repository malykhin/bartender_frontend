import React from 'react'
import { useQuery } from '@apollo/react-hooks'

import SLOTS_QUERY from '../../queries/slots.graphql'

const Slots = () => {
  const { data, loading, error } = useQuery(SLOTS_QUERY)

  console.log(data, loading, error)
  return <div>Slots</div>
}

export default Slots
