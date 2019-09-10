import React from 'react'
import { array } from 'prop-types'
import { get } from 'lodash'

import { useSubscription } from '@apollo/react-hooks'

import { Navbar, Alignment } from '@blueprintjs/core'

import NavItem from './NavItem'
import Status from './Status/Status'

import MACHINE_STATUS_SUBSCRIPTION from 'subscriptions/machineStatus.graphql'

const Header = ({ routes }) => {
  const { data } = useSubscription(MACHINE_STATUS_SUBSCRIPTION)
  const machineStatus = get(data, 'machineStatus.statusName')

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
