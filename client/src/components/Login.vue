<template>
  <div>
    <div class="form">
      <form action="#">
        <div class="form-group">
          <label class="form-control form-label" for="username">Username</label>
          <input
            class="form-control form-input"
            ref="uname"
            id="username"
            type="text"
            placeholder="Username"
            required
          />
        </div>
        <div class="form-group">
          <label class="form-control form-label" for="password">Password</label>
          <input
            class="form-control form-input"
            ref="pass"
            id="password"
            type="password"
            placeholder="Password"
            required
          />
          <span class="form-error">{{ errMsg }}</span>
        </div>
        <div class="form-group">
          <input class="form-btn" @click="submit" type="submit" value="Sign In" id="" />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import LOGIN from '../graphql/login';

export default {
  data() {
    return {
      errMsg: '',
      res: '',
    };
  },
  methods: {
    submit() {
      this.errMsg = '';
      console.log('submit');
      if (this.isValid()) {
        const username = this.$refs.uname.value;
        const password = this.$refs.pass.value;
        console.log(`valid${username}${password}`);
        this.login(username, password);
      }
    },
    isValid() {
      let valid = true;
      if (this.$refs.uname.value === '' || this.$refs.pass.value === '') {
        valid = false;
        console.log(`valid${valid}`);
      }
      return valid;
    },
    async login(username, password) {
      try {
        this.res = await this.$apollo.query({
          query: LOGIN,
          variables: {
            username,
            password,
          },
        });
      } catch (e) {
        console.log(e);
        this.errMsg = e.message;
      }
      console.log(this.res.data.login);
      if (this.res) {
        localStorage.setItem('auth-key', this.res.data.login);
        this.$router.push('Home');
      }
    },
  },
};
</script>

<style scoped>
.form {
  /* width: 100%; */
  /* position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%); */
  box-sizing: border-box;
  border: 1px solid #111;
  border-radius: 10px;
  box-shadow: 2px 5px 10px grey;
  padding: 20px;
  overflow: auto;
}
.form-group {
  margin-bottom: 10px;
  position: relative;
}

.form-control {
  display: block;
  padding: 5px;
}

.form-label {
  font-weight: 600;
}

.form-input {
  width: 95%;
  padding: 15px 10px;
  border: 0.5px solid greenyellow;
  border-radius: 5px;
}
.form-input:focus {
  outline: none;
}

.form-error {
  font-size: 10px;
  color: red;
  display: block;
  height: 10px;
  padding: 5px;
}

.form-btn {
  float: right;
  border: 1px solid green;
  border-radius: 5px;
  padding: 5px 8px;
  /* margin-left: 78%; */
  /* margin-right: 5px; */
  font-weight: 700;
  background-color: rgba(151, 255, 151, 0.92);
  cursor: pointer;
}
.form-btn:hover {
  background-color: rgb(112, 231, 112);
}
</style>
