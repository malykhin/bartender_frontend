import React from 'react'
import { object } from 'prop-types'
import { NavLink, withRouter } from 'react-router-dom'
import cn from 'classnames'

import { Button } from '@blueprintjs/core'

const Item = ({ route, location }) => (
  <NavLink to={route.path}>
    <Button
      className={cn('bp3-minimal', { 'bp3-active': location.pathname === route.path })}
      icon={route.icon}
      text={route.name}
    />
  </NavLink>
)

Item.propTypes = {
  route: object.isRequired,
  location: object.isRequired,
}

export default withRouter(Item)
