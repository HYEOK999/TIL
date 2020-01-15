import gql from 'graphql-tag';

export default {
  allUsers: gql`
    query AllUsers {
      allUsers {
        username
        fullname
        email
        thumbnail
      }
    }
  `,
  getUser: gql`
    query GetUser($id: ID!) {
      getUser(_id: $id) {
        username
        fullname
        email
      }
    }
  `,
  getPost: gql`
    query GetPost($id: ID!) {
      getPost(_id: $id) {
        photo
        likeBy
      }
    }
  `,
};
