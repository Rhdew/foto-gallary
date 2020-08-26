import express from 'express';
import mongoose from 'mongoose';
import { ApolloServer, AuthenticationError } from 'apollo-server-express';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import schema from './graphql/schema/schema.graphql';
import resolvers from './graphql/resolvers';

const { MONGOOSE_URI } = process.env;
const typeDefs = [schema];

const VerifyJwt = async (req) => {
  const token = req.headers.authorization;
  if (token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch (e) {
      throw new AuthenticationError('Your sessions has expired.');
    }
  }
  return null;
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const user = await VerifyJwt(req);
    return { user };
  },
});

mongoose
  .connect(MONGOOSE_URI, {
    useNewUrlParser: true,
    reconnectTries: 30, // Retry up to 30 times
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0,
    autoIndex: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('connected to database');
  })
  .catch(() => {
    console.log('error in db connection');
  });

const app = express();

server.applyMiddleware({ app, path: '/graphql' });

export { app as default };
