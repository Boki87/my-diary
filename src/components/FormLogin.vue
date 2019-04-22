<template>
  <form class="shadow-2 box">
    <div class="field">
      <label class="label">Email</label>
      <div class="control has-icons-left">
        <input class="input outline-primary" type="email" placeholder="john.doe@mail.com">
        <span class="icon is-small is-left">
          <i class="fas fa-envelope"></i>
        </span>
      </div>
      <p v-if="error" class="help">This email is invalid</p>
    </div>

    <div class="field">
      <label class="label">Password</label>
      <div class="control">
        <input class="input" type="password" placeholder="abc123">
      </div>
      <p v-if="error" class="help">This email is invalid</p>
    </div>

    <div class="field has-text-centered">
      <span class="button is-info">Login</span>
    </div>
    <div class="field has-text-centered">
      <span class="has-text-grey">
        Dont have en account?
        <a @click.prevent="$emit('setForm', 'register')">Register here.</a>
      </span>
      <br>
      <span class="has-text-grey">Or login with Google:</span>
    </div>
    <div class="field">
      <span class="social-login shadow-1">
        <img src="../assets/google-logo.png" alt>
      </span>
    </div>
  </form>
</template>
<script>
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  computed: {
    error() {
      return false;
    }
  }
};
</script>
<style lang="scss">
.social-login {
  width: 70px;
  height: 70px;
  border-radius: 100%;
  text-align: center;
  line-height: 70px;
  display: block;
  margin: 0px auto;
  cursor: pointer;
  img {
    height: 50px;
    margin-top: 10px;
  }
}
</style>


