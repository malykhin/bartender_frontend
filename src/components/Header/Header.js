import React from 'react'
import { array } from 'prop-types'

import { useSubscription } from '@apollo/react-hooks'

import { Navbar, Alignment } from '@blueprintjs/core'

import NavItem from './NavItem'

import MACHINE_STATUS_SUBSCRIPTION from 'subscriptions/machineStatus.graphql'

const Header = ({ routes }) => {
  const { data, loading } = useSubscription(MACHINE_STATUS_SUBSCRIPTION)
  console.log('MACHINE_STATUS', data, loading)
  return (
    <Navbar>
      <Navbar.Group align={Alignment.LEFT}>
        <Navbar.Heading>Bartender</Navbar.Heading>
        <Navbar.Divider />

        {routes.map((route) => (
          <NavItem key={route.name} route={route} />
        ))}
      </Navbar.Group>
    </Navbar>
  )
}

Header.propTypes = {
  routes: array.isRequired,
}

export default Header
