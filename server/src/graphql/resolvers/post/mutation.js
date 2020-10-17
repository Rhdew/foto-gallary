import { AuthenticationError, UserInputError } from 'apollo-server-express';
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

    await User.findByIdAndUpdate(currentUser.id, { $push: { posts: createdPost.id } });
  } catch (err) {
    console.log(err);
  }

  return createdPost;
};

const deletePost = async (parent, { post }, { user }) => {
  if (!user) {
    throw new AuthenticationError('you are not logged in');
  }
  let deletedPost;
  const currentUser = await User.findOne({ username: user.username });

  try {
    await new Promise((resolve, reject) => {
      cloudinary.v2.uploader.distroy(post.imagePublicId, (error, result) => {
        if (error) {
          reject(error);
        } else resolve(result);
      });
    });
    deletedPost = await Post.findOneAndRemove({ imagePublicId: post.imagePublicId }, function (
      err,
      docs,
    ) {
      if (err) {
        console.log(err);
      } else {
        console.log('removed post', docs);
      }
    });

    await User.findByIdAndUpdate(currentUser.id, { $pull: { posts: deletedPost.id } });
  } catch (err) {
    console.log(err);
  }
};
module.exports = {
  createPost,
  deletePost,
};
