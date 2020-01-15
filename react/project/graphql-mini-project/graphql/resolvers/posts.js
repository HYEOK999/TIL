// FRONT 에서 데이터 요청을 했을 떄 데이터를 직접적으로 처리하는 구간
export default {
  Query: {
    getPost: (parent, args, { models }) => models.Post.findOne(args)
  },
  Mutation: {
    createPost: (parent, args, { models, user }) =>
      models.Post.create({ ...args.post, by: user })
  }
};
