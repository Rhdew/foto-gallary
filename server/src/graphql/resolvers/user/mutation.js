import validator from 'validator';
import bcrypt from 'bcrypt';
import User from '../../../models/user';
import {UserInputError} from 'apollo-server-express';

const createUser = async (parent, args)=>{
    if(!validator.isAlphanumeric(args.user.username)){
        throw new UserInputError('username should be alphanumeric');
    }
    if(validator.isEmpty(args.user.username , { ignore_whitespace:true})){
        throw new UserInputError('username can not be empty');
    }
    if(validator.isEmpty(args.user.password, { ignore_whitespace:true})){
        throw new UserInputError('username can not be empty');
    }
    if(validator.isEmpty(args.user.email, { ignore_whitespace:true})){
        throw new UserInputError('email can not be empty');
    }
    if(!validator.isEmail(args.user.email)){
        throw new UserInputError('email should be valid');
    }
    
    const user = await User.findOne({ username: args.user.username });
    if (user) {
        throw new UserInputError('Username already exist');
    }

    const hashedPassword = await bcrypt.hash(args.user.password, 10);
    return User.create({ username: args.user.username, password: hashedPassword, email: args.user.email });
};

module.exports = {
    createUser,
}