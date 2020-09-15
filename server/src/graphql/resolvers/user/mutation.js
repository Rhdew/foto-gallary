import validator from 'validator';
import bcrypt from 'bcrypt';
import { UserInputError, AuthenticationError } from 'apollo-server-express';
import cloudinary from 'cloudinary';
import User from '../../../models/user';
import UserFollowing from '../../../models/userFollowing';

const createUser = async (parent, args) => {
  if (!validator.isAlphanumeric(args.user.username)) {
    throw new UserInputError('username should be alphanumeric');
  }
  if (validator.isEmpty(args.user.username, { ignore_whitespace: true })) {
    throw new UserInputError('username can not be empty');
  }
  if (validator.isEmpty(args.user.password, { ignore_whitespace: true })) {
    throw new UserInputError('username can not be empty');
  }
  if (validator.isEmpty(args.user.email, { ignore_whitespace: true })) {
    throw new UserInputError('email can not be empty');
  }
  if (!validator.isEmail(args.user.email)) {
    throw new UserInputError('email should be valid');
  }

  const user = await User.findOne({ username: args.user.username });
  if (user) {
    throw new UserInputError('Username already exist');
  }

  const hashedPassword = await bcrypt.hash(args.user.password, 10);
  return User.create({
    username: args.user.username,
    password: hashedPassword,
    email: args.user.email,
  });
};

const followUser = async (parent, args, { user }) => {
  if (!user) {
    throw new AuthenticationError('you are not logged in');
  }

  const userTOFollow = await User.findOne({ username: args.username });
  if (!userTOFollow) {
    throw new UserInputError('user does not found by given username');
  }

  const currentUser = await User.findOne({ username: user.username });

  const isAlreadyFollowing = await UserFollowing.findOne({
    followers: currentUser.id,
    following: userTOFollow.id,
  });
  if (isAlreadyFollowing) {
    throw new UserInputError('user already followed');
  }

  await UserFollowing.create({ followers: currentUser.id, following: userTOFollow.id });

  await User.findOneAndUpdate(
    { username: user.username },
    { $push: { following: userTOFollow.id } },
  );

  return userTOFollow;
};

const unfollowUser = async (parent, args, { user }) => {
  if (!user) {
    throw new AuthenticationError('you are not logged in');
  }
  const currentUser = await User.findOne({ username: user.username });

  const userToUnfollow = await User.findOne({ username: args.username });
  if (!userToUnfollow) {
    throw new UserInputError('user is not found by given username');
  }

  const isUserFollowed = await UserFollowing.findOne({
    followers: currentUser.id,
    following: userToUnfollow.id,
  });
  if (!isUserFollowed) {
    throw new UserInputError('User does not followed by current user');
  }

  await UserFollowing.findOneAndDelete({
    followers: currentUser.id,
    following: userToUnfollow.id,
  });

  await User.findOneAndUpdate(
    { username: user.username },
    { $pull: { following: userToUnfollow.id } },
  );

  return userToUnfollow;
};

const uploadUserImage = async (parent, { image }, { user }) => {
  if (!user) {
    throw new AuthenticationError('you are not logged in');
  }

  const { createReadStream } = await image.file;
  const stream = createReadStream();
  let updatedUser;

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

    updatedUser = await User.findOneAndUpdate(
      { username: user.username },
      { image: res.secure_url, imagePublicId: res.public_id },
      { new: true },
    );
  } catch (err) {
    console.log(err);
  }
  // console.log(updatedUser);
  return updatedUser;
};

module.exports = {
  createUser,
  followUser,
  unfollowUser,
  uploadUserImage,
};
