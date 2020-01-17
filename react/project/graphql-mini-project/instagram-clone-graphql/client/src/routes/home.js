import React from 'react'
import { graphql } from 'react-apollo'
import gpl from 'graphql-tag'

import Toolbar from '../components/toolbar'

const query = gpl`{
  allUsers {
    username
  }
}`

const userItem = user => (
  <li key={user.username}>{user.username}</li>
)

export default graphql(query)(
  ({ data: { allUsers = [], loading } }) => [
    <Toolbar />,
    <ul>
      {allUsers.map(userItem)}
    </ul>,
  ]
)
