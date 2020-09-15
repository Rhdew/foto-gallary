<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <input ref="file" type="file" accept="image/*" />
    <button @click="createPost">Submit</button>
    <router-view />
  </div>
</template>

<script>
import CREATEPOST from './graphql/createPost';

export default {
  data() {
    return {
      res: null,
    };
  },
  methods: {
    async createPost() {
      console.log(this.$refs.file.files[0]);
      this.res = await this.$apollo.mutate({
        mutation: CREATEPOST,
        variables: {
          post: {
            caption: 'cap',
            image: this.$refs.file.files[0],
          },
        },
      });
      console.log(this.res.data.createPost);
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
