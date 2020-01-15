// 회원 가입을 위한 MUTATION
// MUTATION (쓰기, 수정, 삭제) VS QUERY (읽기)

import gql from 'graphql-tag';

export default {
  creatUser: gql`
    mutation CreateUser(
      $username: String!
      $password: String!
      $fullname: String!
      $email: String!
    ) {
      createUser(
        username: $username
        password: $password
        fullname: $fullname
        email: $email
      )
    }
  `,
  createPost: gql`
    mutation CreatePost($iPost: Post!) {
      createPost(post: $iPost)
    }
  `,
};

// function ($username: String!, $password: String!, $fullname: String!, $email: String!)
