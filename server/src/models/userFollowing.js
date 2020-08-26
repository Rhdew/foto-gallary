import mongoose, { Schema } from 'mongoose';

const userFollowingSchema = new mongoose.Schema({
    following: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    followers: {
        type: Schema.Types.ObjectId,
        ref:'User'
    }
},{timestamps:true});

userFollowingSchema.index({
    following:1,
    followers:1
}, { unique:true });

module.exports = mongoose.model('UserFollowing',userFollowingSchema);