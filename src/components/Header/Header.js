import React from 'react'
import { array } from 'prop-types'
import { get } from 'lodash'
import cn from 'classnames'

import { useSubscription, useMutation } from '@apollo/react-hooks'

import { Navbar, Alignment, Button, Classes } from '@blueprintjs/core'

import NavItem from './NavItem'
import Status from './Status/Status'

import MACHINE_STATUS_SUBSCRIPTION from 'subscriptions/machineStatus.graphql'
import RESET_MACHINE_MUTATION from 'mutations/resetMachine.graphql'

const Header = ({ routes }) => {
  const { data } = useSubscription(MACHINE_STATUS_SUBSCRIPTION)
  const machineStatus = get(data, 'machineStatus.statusName')

  const [resetMachine, { loading }] = useMutation(RESET_MACHINE_MUTATION)

  const isLoading = loading
  return (
    <Navbar>
      <Navbar.Group align={Alignment.LEFT}>
        <Navbar.Heading>Bartender</Navbar.Heading>
        <Navbar.Divider />

        {routes.map((route) => (
          <NavItem key={route.name} route={route} />
        ))}
      </Navbar.Group>
      <Navbar.Group align={Alignment.RIGHT}>
        <Button onClick={resetMachine} className={cn({ [Classes.SKELETON]: isLoading })}>
          Reset
        </Button>
        <Navbar.Divider />
        <Navbar.Heading>
          <Status machineStatus={machineStatus} />
        </Navbar.Heading>
      </Navbar.Group>
    </Navbar>
  )
}

Header.propTypes = {
  routes: array.isRequired,
}

export default Header
