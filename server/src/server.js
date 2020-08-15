import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import { ApolloServer } from 'apollo-server-express';
import schema from './graphql/schema/schema.graphql';
import resolvers from './graphql/resolvers';

let MONGOOSE_URI = "mongodb+srv://root:root@fotogallarycluster.v6wra.mongodb.net/<Dev>?retryWrites=true&w=majority" ;

const typeDefs = [schema];

const server = new ApolloServer({ typeDefs, resolvers });

mongoose.connect(MONGOOSE_URI,{
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
    console.log('error');
  });

let app = express();

server.applyMiddleware({ app, path: '/gql' });

const publicPath = path.join(__dirname + '/../../public');

app.use(express.static(publicPath));
app.get('/', (req,res)=>{
    res.sendFile(`${publicPath}/index.html`)
});

export {app as default}
