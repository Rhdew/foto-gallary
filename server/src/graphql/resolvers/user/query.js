import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {UserInputError} from 'apollo-server-express';
import User from '../../../models/user';

const login = async (parent, args) =>{
    if(validator.isEmpty(args.user.username , { ignore_whitespace:true})){
        throw new UserInputError('username can not be empty');
    }
    if(validator.isEmpty(args.user.password, { ignore_whitespace:true})){
        throw new UserInputError('username can not be empty');
    }

    const user = await User.findOne({username: args.user.username});
    if(!user){
        throw new UserInputError('username is wrong');
    }

    const isPasswordMatch = await bcrypt.compare(args.user.password === user.password);
    if(!isPasswordMatch){
        throw new UserInputError('password is wrong');
    }

    const token = await jwt.sign({username: args.user.username}, process.env.JSON_SECRET_KEY);
    return token;
}

module.exports = {
    login,
}