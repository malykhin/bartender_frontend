import { hot } from 'react-hot-loader/root'

import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { ApolloProvider } from '@apollo/react-hooks'

import Header from './components/Header/Header'
import routes from './routes'
import apolloClient from './services/apolloClient'

const Root = () => (
  <ApolloProvider client={apolloClient}>
    <Router>
      <Header routes={routes} />
      <Switch>
        {routes.map((route) => (
          <Route key={route.name} path={route.path} component={route.component} exact={route.exact} />
        ))}
      </Switch>
    </Router>
  </ApolloProvider>
)

export default hot(Root)
