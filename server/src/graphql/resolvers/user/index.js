/* eslint-disable import/named */
import {
  login,
  profile,
  getCountOfFollowers,
  getCountOfFollowing,
  getFollowers,
  getFollowings,
} from './query';
import { createUser, followUser, unfollowUser, uploadUserImage } from './mutation';

module.exports = {
  createUser,
  login,
  profile,
  followUser,
  unfollowUser,
  getCountOfFollowers,
  getCountOfFollowing,
  getFollowers,
  getFollowings,
  uploadUserImage,
};
