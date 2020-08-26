/* eslint-disable import/named */
import { login, profile } from './query';
import { createUser, followUser, unfollowUser } from './mutation';

module.exports = {
  createUser,
  login,
  profile,
  followUser,
  unfollowUser,
};
