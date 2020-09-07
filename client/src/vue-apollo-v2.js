import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { createUploadLink } from 'apollo-upload-client';
import Vue from 'vue';
import VueApollo from 'vue-apollo';

Vue.use(VueApollo);

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVuaWwiLCJpYXQiOjE1OTgyODE3Mzl9.v9b5j6XwinlffDPInEru6kyrzpEiThE96TMv28DccZo';

const apolloClient = new ApolloClient({
  link: createUploadLink({
    uri: `http://localhost:3000/graphql`,
    headers: {
      authorization: token,
    },
  }),
  cache: new InMemoryCache(),
});

// eslint-disable-next-line import/prefer-default-export
export const createProvider = new VueApollo({
  defaultClient: apolloClient,
});
