export default {
  Query: {
    allUsers: (parent, args, { models }) => models.User.find(),
    getUser: (parent, args, { models }) => models.User.findOne(args),
  },
  Mutation: {
    createUser: async (parent, { password, ...args }, { models }) => {
      try {
        const user = await models.User.create({ ...args, password });
        return user && user._id;
      } catch (error) {
        return false;
      }
    },
  },
};
