import user from './user';

const resolvers = {
  Query: {
    hello: () => `Hello world!`,
    login: user.login,
    profile: user.profile,
    getCountOfFollowers: user.getCountOfFollowers,
    getCountOfFollowing: user.getCountOfFollowing,
    getFollowers: user.getFollowers,
    getFollowings: user.getFollowings,
  },

  Mutation: {
    hi: () => 'hey',
    createUser: user.createUser,
    followUser: user.followUser,
    unfollowUser: user.unfollowUser,
  },
};

export { resolvers as default };
