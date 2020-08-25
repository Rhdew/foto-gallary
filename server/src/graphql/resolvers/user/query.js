import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {UserInputError,AuthenticationError} from 'apollo-server-express';
import User from '../../../models/user';

const login = async (parent, args) =>{
    if(validator.isEmpty(args.username , { ignore_whitespace:true})){
        throw new UserInputError('username can not be empty');
    }
    if(validator.isEmpty(args.password, { ignore_whitespace:true})){
        throw new UserInputError('username can not be empty');
    }

    const user = await User.findOne({username: args.username});
    if(!user){
        throw new UserInputError('username is wrong');
    }

    const isPasswordMatch = await bcrypt.compare(args.password, user.password);
    if(!isPasswordMatch){
        throw new UserInputError('password is wrong');
    }

    const token = await jwt.sign({username: args.username}, process.env.JWT_SECRET_KEY);
    return token;
}

/**
 * Creates a mongoose select string from the given graphql query
 *
 * @param  {Object} info - GraphQL resolver's info parameter
 * @return {string} Returns a string which can be used as a select parameter in any mongoose query https://mongoosejs.com/docs/api.html#query_Query-select
 */
function generateMongooseSelectFieldsFromInfo(info) {
    return new Promise((resolve, reject) => {
      if (!info) {
        reject(new Error('Info is null'));
      }
      let returnFields = '';
      const selectionFields = info.operation.selectionSet.selections[0].selectionSet.selections;
  
      selectionFields.forEach((field) => {
        if (field.name.value !== '__typename') {
          returnFields += field.name.value;
          returnFields += ' ';
        }
      });
      resolve(returnFields);
    });
  }

const profile = async (parent, args, { user }, info) => {
    if(!user) {
        throw new AuthenticationError('You are not logged in');
    }
    let selectionFields = await generateMongooseSelectFieldsFromInfo(info);
    return User.findOne({username: user.username}, selectionFields, { lean: true });
}

module.exports = {
    login,
    profile,
}