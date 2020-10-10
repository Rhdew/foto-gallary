<template>
  <div class="about">
    <input ref="file" type="file" accept="image/*" />
    <button @click="uploadUserImage">Submit</button>
  </div>
</template>

<script>
import UPLOADUSERIMAGE from '../graphql/uploadUserImage';

export default {
  data() {
    return {
      res: null,
    };
  },
  methods: {
    async uploadUserImage() {
      console.log(this.$refs.file.files[0]);
      this.res = await this.$apollo.mutate({
        mutation: UPLOADUSERIMAGE,
        variables: {
          image: this.$refs.file.files[0],
        },
      });
      console.log(this.res.data.uploadUserImage);
    },
  },
};
</script>
