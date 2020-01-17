import React, { useEffect } from 'react';
import './App.css';
import { ApolloProvider, useQuery } from '@apollo/react-hooks';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createUploadLink } from 'apollo-upload-client';
import { FileUpload } from './Components/FileUpload';
import gql from 'graphql-tag';

const link = createUploadLink({ uri: 'http://localhost:4000/graphql' });

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <FileUpload />
      <hr />
      <Files />
    </ApolloProvider>
  );
}

const GET_FILES = gql`
  {
    files
  }
`;

function Files() {
  const { data, loading } = useQuery(GET_FILES); // useQuery는 객체, useMutation은 배열

  useEffect(() => {
    console.log('abc');
  });

  if (loading) return <p>loading</p>;
  return (
    <>
      {data.files.map((f, i) => (
        <p key={i}>{f}</p>
      ))}
    </>
  );
}

export { App, GET_FILES };
