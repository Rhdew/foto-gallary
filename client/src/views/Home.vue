<template>
  <div class="home">
    <div class="header">
      <a href="#">Foto Gallery</a>
      <a href="#">Logout</a>
    </div>
    <img alt="Vue logo" src="../assets/logo.png" />
    <input ref="file" type="file" accept="image/*" />
    <button @click="createPost">Submit</button>
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
// eslint-disable-next-line import/no-unresolved
import HelloWorld from '@/components/HelloWorld.vue';

// eslint-disable-next-line import/no-unresolved
import CREATEPOST from '@/graphql/createPost';

export default {
  name: 'Home',
  components: {
    HelloWorld,
  },
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

<style scoped>
.home {
  width: 50%;
  margin: 0 auto;
  border-left: 1px solid grey;
  border-right: 1px solid grey;
  /* background-color: rgb(137, 216, 137); */
  /* padding: 10px; */
}

.header {
  box-sizing: border-box;
  width: 100%;
  padding: 10px 20px;
  background-color: rgb(23, 24, 22);
  color: beige;
}
</style>
