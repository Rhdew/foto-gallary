import { AuthenticationError } from 'apollo-server-express';
import cloudinary from 'cloudinary';
import User from '../../../models/user';
import Post from '../../../models/post';

const createPost = async (parent, { post }, { user }) => {
  if (!user) {
    throw new AuthenticationError('user is not logged in');
  }

  const currentUser = await User.findOne({ username: user.username });

  const { createReadStream } = await post.image.file;
  const stream = createReadStream();

  let createdPost = '';

  try {
    const res = await new Promise((resolve, reject) => {
      stream.pipe(
        cloudinary.v2.uploader.upload_stream((error, result) => {
          if (error) {
            reject(error);
          }

          resolve(result);
        }),
      );
    });

    createdPost = await Post.create({
      caption: post.caption,
      image: res.secure_url,
      imagePublicId: res.public_id,
      author: currentUser.id,
    });
  } catch (err) {
    console.log(err);
  }

  return createdPost;
};

module.exports = {
  createPost,
};
