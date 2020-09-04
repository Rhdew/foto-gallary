import { AuthenticationError } from 'apollo-server-express';
import cloudinary from 'cloudinary';
import path from 'path';
import User from '../../../models/user';
import Post from '../../../models/post';

const createPost = async (parent, args, { user }) => {
  if (!user) {
    throw new AuthenticationError('user is not logged in');
  }
  const currentUser = await User.findOne({ username: user.username });
  const mainDir = path.dirname(require.main.filename);
  const fileName = `${mainDir}/images/${args.post.image}`;
  // const fileName = `__dirname/../../../../images/${args.post.image}`;

  const photo = await cloudinary.v2.uploader.upload(fileName);
  const post = await Post.create({
    caption: args.post.caption,
    image: photo.public_id,
    author: currentUser.id,
  });

  return post;
};

module.exports = {
  createPost,
};
