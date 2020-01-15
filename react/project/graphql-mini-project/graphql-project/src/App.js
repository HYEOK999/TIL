import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createUser as CREATE_USER } from './graphql/mutations';
import { useMutation, useQuery } from 'react-apollo';

const cache = new InMemoryCache();
const link = new HttpLink({ uri: 'http://localhost:3000/graphql' });

const client = new ApolloClient({
  link,
  cache,
});

function App(...payload) {
  const [createUser, { data }] = useMutation(CREATE_USER);

  return (
    <ApolloProvider client={client}>
      <button
        onClick={() =>
          createUser({
            variables: { ...payload },
          })
        }
      >
        가입
      </button>
    </ApolloProvider>
  );
}

export default App;
