<template>
  <div class="home">
    <div class="header">
      <a href="#">Foto Gallery</a>
      <a href="#">Logout</a>
    </div>
    <Post />
  </div>
</template>

<script>
// @ is an alias to /src
// eslint-disable-next-line import/no-unresolved
import Post from '@/components/Post.vue';
// eslint-disable-next-line import/no-unresolved
import CREATEPOST from '@/graphql/createPost';

export default {
  name: 'Home',
  components: {
    Post,
  },
  data() {
    return {};
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
