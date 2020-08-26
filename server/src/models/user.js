import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    following: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
});

// export let User = mongoose.model('user', userSchema);

module.exports = mongoose.model('User', userSchema);