import validator from 'validator';
import bcrypt from 'bcrypt';
import User from '../../../models/user';
import UserFollowing from '../../../models/userFollowing';
import {UserInputError, AuthenticationError} from 'apollo-server-express';

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

const followUser = async (parent,args,{ user }) => {
    if(!user){
        throw new AuthenticationError('user is not log in');
    }

    const userTOFollow = await User.findOne({ username: args.username});
    if(!userTOFollow){
        throw new UserInputError('user does not found by given username');
    }

    const currentUser = await User.findOne({ username: user.username});

    const isAlreadyFollowing = await UserFollowing.findOne({ 
        follower: currentUser.id, 
        following: userTOFollow._id
    });
    if(isAlreadyFollowing){
        throw new UserInputError('user already followed');
    }

    await UserFollowing.create({ follower: currentUser.id, following: userTOFollow._id});
    
    return User.findOneAndUpdate(
        {username: user.username},
        {$push: {following: userTOFollow._id}},
        {new:true}
    );
}

module.exports = {
  createUser,
  followUser,
};