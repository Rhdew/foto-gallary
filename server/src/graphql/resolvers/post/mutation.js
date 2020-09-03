import { AuthenticationError } from 'apollo-server-express';
import User from '../../../models/user';
import Post from '../../../models/post';

const createPost = async (parent, args, { user }) => {
  if (!user) {
    throw new AuthenticationError('user is not logged in');
  }
  const currentUser = await User.findOne({ username: user.username });

  const post = await Post.create({
    caption: args.post.caption,
    image: args.post.image,
    author: currentUser.id,
  });

  return post;
};

module.exports = {
  createPost,
};
