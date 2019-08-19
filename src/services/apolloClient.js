import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createHttpLink } from 'apollo-link-http'

import { API_URL } from '../config'

export default new ApolloClient({
  link: createHttpLink({
    uri: API_URL,
    credentials: 'same-origin',
  }),
  cache: new InMemoryCache(),
})
