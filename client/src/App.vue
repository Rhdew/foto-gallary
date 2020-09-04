<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <input type="file" accept="image/*" @change="createPost" />
    <router-view />
  </div>
</template>

<script>
import CREATEPOST from './graphql/createPost';

export default {
  methods: {
    async createPost({ target }) {
      await this.$apollo.mutate({
        mutation: CREATEPOST,
        variables: {
          post: {
            caption: 'cap',
            image: target.files[0],
          },
        },
      });
      //   console.log(res);
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
