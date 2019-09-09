import { ApolloClient } from 'apollo-client'
import { split } from 'apollo-link'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createHttpLink } from 'apollo-link-http'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'

import { HTTP_LINK, WS_LINK } from '../config'

const httpLink = createHttpLink({
  uri: HTTP_LINK,
  credentials: 'same-origin',
})

const wsLink = new WebSocketLink({
  uri: WS_LINK,
  options: {
    reconnect: true,
  },
})

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
  },
  wsLink,
  httpLink,
)

export default new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
})
