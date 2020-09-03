import mongoose, { Schema } from 'mongoose';

const postSchema = new Schema({
  caption: {
    type: String,
  },
  image: {
    type: String,
    req: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    req: true,
  },
  likes: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

module.exports = mongoose.model('Post', postSchema);
