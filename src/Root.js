import { hot } from 'react-hot-loader/root'

import React from 'react'

import Machine from './containers/Machine/Machine'
import Receipts from './containers/Receipts/Receipts'

import Header from './components/Header/Header'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

export const routes = [
  { name: 'Receipts', path: '/', component: Receipts, icon: 'document', exact: true },
  { name: 'Machine', path: '/machine', component: Machine, icon: 'cog' },
]

const Root = () => (
  <Router>
    <Header routes={routes} />
    <Switch>
      {routes.map((route) => (
        <Route key={route.name} path={route.path} component={route.component} exact={route.exact} />
      ))}
    </Switch>
  </Router>
)

export default hot(Root)
