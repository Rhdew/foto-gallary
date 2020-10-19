<template>
  <div class="post">
    <div class="post-form">
      <form action="#">
        <div>
          <label>caption</label>
          <input type="text" placholder="caption here" v-model="caption" />
        </div>
        <div>
          <label>image</label>
          <input type="file" @change="onChange" />
        </div>
        <div>
          <input type="submit" @click="createPost" value="POST" />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import CREATEPOST from '../graphql/createPost';

export default {
  data() {
    return {
      res: null,
      caption: '',
      selectedFile: null,
    };
  },
  methods: {
    onChange(event) {
      // eslint-disable-next-line prefer-destructuring
      this.selectedFile = event.target.files[0];
      console.log(this.selectedFile);
    },
    async createPost() {
      console.log(this.caption);
      console.log(this.selectedFile);
      this.res = await this.$apollo.mutate({
        mutation: CREATEPOST,
        variables: {
          post: {
            caption: this.caption,
            image: this.selectedFile,
          },
        },
      });
      console.log(this.res.data.createPost);
    },
  },
};
</script>

<style scoped></style>
