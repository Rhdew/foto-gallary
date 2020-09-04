import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { createUploadLink } from 'apollo-upload-client';
import Vue from 'vue';
import VueApollo from 'vue-apollo';

Vue.use(VueApollo);

const apolloClient = new ApolloClient({
  link: createUploadLink({ uri: `http://localhost:3000/graphql` }),
  cache: new InMemoryCache(),
});

// eslint-disable-next-line import/prefer-default-export
export const createProvider = new VueApollo({
  defaultClient: apolloClient,
});
