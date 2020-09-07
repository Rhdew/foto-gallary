import GraphQLUpload from 'graphql-upload';

import user from './user';
import post from './post';

const resolvers = {
  Upload: GraphQLUpload,
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
    createPost: post.createPost,
  },
};

export { resolvers as default };
