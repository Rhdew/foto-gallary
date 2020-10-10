<template>
  <div>
    <div class="form">
      <form>
        <div class="form-group">
          <label class="form-control form-label" for="username">Username</label>
          <input
            class="form-control form-input"
            ref="username"
            id="username"
            type="text"
            placeholder="Username"
            required
          />
          <span class="form-error"></span>
        </div>
        <div class="form-group">
          <label class="form-control form-label" for="email">Email</label>
          <input
            class="form-control form-input"
            ref="email"
            id="email"
            type="email"
            placeholder="Email"
            required
          />
          <span class="form-error">{{ error.email }}</span>
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
          <span class="form-error"></span>
        </div>
        <div class="form-group">
          <label class="form-control form-label" for="cnfPassword">Confirm Password</label>
          <input
            class="form-control form-input"
            ref="cnfPass"
            id="cnfPassword"
            type="password"
            placeholder="Password"
            required
          />
          <span class="form-error">{{ error.password }}</span>
          <span class="form-error">{{ error.message }}</span>
        </div>
        <div class="form-group">
          <input class="form-btn" @click="submit" type="submit" value="Sign Up" id="" />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import CREATEUSER from '../graphql/createUser';

export default {
  data() {
    return {
      error: {
        email: '',
        password: '',
        message: '',
      },
      res: '',
    };
  },
  methods: {
    submit() {
      console.log('submit');
      if (this.isValid()) {
        const username = this.$refs.username.value;
        const email = this.$refs.email.value;
        const password = this.$refs.pass.value;
        this.createUser(username, email, password);
      }
    },
    isValid() {
      console.log('validating...');
      this.error.email = '';
      this.error.password = '';
      this.error.message = '';
      let valid = true;
      const re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

      if (!re.test(this.$refs.email.value)) {
        this.error.email = 'Email not valid';
        valid = false;
      }
      if (this.$refs.pass.value !== this.$refs.cnfPass.value) {
        this.error.password = 'Password does not match *';
        valid = false;
      }

      return valid;
    },
    async createUser(username, email, password) {
      try {
        this.res = await this.$apollo.mutate({
          mutation: CREATEUSER,
          variables: {
            user: {
              username,
              email,
              password,
            },
          },
        });
      } catch (error) {
        console.log(error.message);
        this.error.message = error.message;
      }
      if (this.res) {
        this.error.message = `User ${this.res.data.createUser.username} created. Login to your account`;
      }
    },
  },
};
</script>

<style scoped>
.form {
  /* width: 25%; */
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
.form-input:focus,
.form-input:active,
.form-input:invalid {
  outline: none;
}
/* .form-input:active:invalid {
  border: 1px solid rgb(155, 94, 94);
} */

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
  font-weight: 700;
  background-color: rgba(151, 255, 151, 0.92);
  cursor: pointer;
}
.form-btn:hover {
  background-color: rgb(112, 231, 112);
}
</style>
