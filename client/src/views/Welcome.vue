<template>
  <div class="frame">
    <div class="header">
      <h1>Foto Gallery</h1>
    </div>
    <div class="container">
      <div class="form">
        <app-login v-if="value"></app-login>
        <app-register v-else></app-register>
        <button @click="change" class="btn">{{ action }}</button>
      </div>
    </div>
  </div>
</template>

<script>
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';

export default {
  data() {
    return {
      value: true,
      action: 'New Here? Register',
    };
  },
  methods: {
    change() {
      this.value = !this.value;
      this.action = this.value ? 'New Here? Register' : 'Already registered? Login';
      console.log(this.value);
    },
  },
  components: {
    appLogin: Login,
    appRegister: Register,
  },
};
</script>
<style scoped>
.frame {
  /* border: 5px solid green;
  border-radius: 10px;
  border-style: outset;
  background-color: rgb(248, 242, 242); */
}
.header {
  /* height: 10%; */
  padding: 10px;
  padding-left: 30px;
}
.container {
  /* height: 90%; */
}
.form {
  width: 25%;
  /* height: 100%; */
  margin: auto;
  margin-top: 30px;
  /* position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); */
}
.btn:focus,
.btn:active {
  outline: none;
}
.btn {
  margin-top: 10px;
  margin-left: 10px;
  padding: 0;
  border: none;
  border-bottom: 1px solid greenyellow;
  cursor: pointer;
  background-color: transparent;
  color: green;
  font-weight: 500;
  font-size: 13px;
}
@media screen and (max-width: 1200px) {
  .form {
    width: 40%;
  }
}
@media screen and (max-width: 900px) {
  .form {
    width: 50%;
  }
}

@media screen and (max-width: 600px) {
  .form {
    width: 80%;
  }
}
</style>
