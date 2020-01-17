import gpl from 'graphql-tag'

export default {
  queries: {
    allUsers: gpl`
    query AllUsers {
      allUsers {
        username
        fullname
        email
        thumbnail
      }
    }
  `,
    getUser: gpl`
    query GetUser($id: ID!) {
      getUser(_id: $id) {
        username
        fullname
        email
      }
    }
  `,
    getPost: gpl`
    query GetPost($id: ID!) {
      getPost(_id: $id) {
        photo
        likeBy
      }
    }
  `,
  },
  mutations: {
    createUser: gpl`
    mutation($username: String!, $password: String!, $fullname: String!, $email: String!) {
      createUser(username: $username, password: $password, fullname: $fullname, email: $email)
    }
  `,
  },
  subscriptions: {},
}
