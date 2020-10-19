<template>
  <div class="post">
    <div class="post-form">
      <form action="#">
        <div class="caption">
          <label for="caption">Caption</label>
          <textarea
            type="text"
            id="caption"
            required
            placeholder="caption here"
            v-model="caption"
            rows="3"
          ></textarea>
        </div>
        <div class="image">
          <label for="image">Image</label>
          <input type="file" id="image" required @change="onChange" />
        </div>
        <div>
          <input class="submit-btn" type="submit" @click="createPost" value="POST" />
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

<style scoped>
* {
  margin: 0px;
  padding: 0px;
}
.post {
  border: 1px solid #049892;
  border-radius: 10px;
  width: 60%;
  background-color: white;
  margin-bottom: 0.25%;
  margin-top: 5%;
  overflow: auto;
  box-shadow: 2px 5px 10px grey;
}
.caption {
  margin: 7px;
}
.image {
  margin: 7px;
}
.submit-btn {
  font-weight: 600;
  float: right;
  border: 1px #049892 solid;
  border-radius: 5px;
  margin: 10px 15px 15px 15px;
  padding-top: 3px;
  padding-bottom: 3px;
  padding-right: 7px;
  padding-left: 7px;
  color: #049892;
}
#caption {
  resize: none;
  font-weight: 600;
  border: 1px #049892 solid;
  border-radius: 5px;
  min-width: 97%;
  padding-left: 5px;
  max-width: 97%;
  border: 1px #929292 solid;
}
label {
  color: #049892;
  display: block;
  padding-bottom: 5px;
  font-weight: 600;
}
</style>
