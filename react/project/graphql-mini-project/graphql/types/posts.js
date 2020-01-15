// GraphQL
export default `
  type Post {
    _id: ID! # _는 시스템 내부적인 용도의 의미, Scalar type(단일데이터), null이 될수없다.
    by: User # 커스텀타입. types/users.js 정의. 작성자
    desc: String # desc 내림차순 asc 오름차순
    photo: String # 문자열로 바이너리파일을 표현할 수 없기 때문에 이미지 주소값을 저장한다.
    likedBy: [User] # 좋아요를 누른 사람들 - 리스트(배열)
    comments: [User] # 댓글을 다른 사람들 - 리스트(배열)
    createdAt: String # 생성일
  }

  input iBy {
    username: String!
    thumbnail: String
  }

  input iPost {
    desc: String
    photo: String
  }

  type Query {
    getPost(_id: ID!): Post!
  }

  type Mutation {
    createPost(post: iPost): Post!
  }
`;
