import React from 'react'
import { array } from 'prop-types'
import { Navbar, Alignment } from '@blueprintjs/core'
import NavItem from './NavItem'

const Header = ({ routes }) => (
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

Header.propTypes = {
  routes: array.isRequired,
}

export default Header
