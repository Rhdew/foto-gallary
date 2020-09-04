import { AuthenticationError } from 'apollo-server-express';
import cloudinary from 'cloudinary';
import path from 'path';
import User from '../../../models/user';
import Post from '../../../models/post';

const createPost = async (parent, { post }, { user }) => {
  if (!user) {
    throw new AuthenticationError('user is not logged in');
  }
  const currentUser = await User.findOne({ username: user.username });

  const { createReadStream } = await post.image;
  const stream = createReadStream();

  const mainDir = path.dirname(require.main.filename);
  const fileName = `${mainDir}/images/${post.image}`;
  // const fileName = `__dirname/../../../../images/${args.post.image}`;

  const photo = await stream.pipe(cloudinary.v2.uploader.upload_stream());

  const createdPost = await Post.create({
    caption: post.caption,
    image: photo.secure_url,
    imagePublicId: photo.public_id,
    author: currentUser.id,
  });

  return createdPost;
};

module.exports = {
  createPost,
};
