/* eslint-disable import/named */
import { login, profile, getCountOfFollowers, getCountOfFollowing } from './query';
import { createUser, followUser, unfollowUser } from './mutation';

module.exports = {
  createUser,
  login,
  profile,
  followUser,
  unfollowUser,
  getCountOfFollowers,
  getCountOfFollowing,
};
