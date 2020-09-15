import { AuthenticationError } from 'apollo-server-express';
import Post from '../../../models/post';

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

const getAllPosts = async (parent, args, { user }, info) => {
  if (!user) {
    throw new AuthenticationError('user is not logged in');
  }
  const selectionFields = await generateMongooseSelectFieldsFromInfo(info);
  const posts = await Post.find({}, selectionFields, { lean: true });

  return posts;
};

module.exports = {
  getAllPosts,
};
