<template>
  <div class="container" style="padding:10px;">
    <div class="columns">
      <div class="column is-6 is-offset-3">
        <img src="../assets/logo.png" style="display:block;margin: 0px auto;width:200px;" alt>

        <login-form v-if="form == 'login'" @setForm="setForm"></login-form>
        <register-form v-if="form == 'register'" @setForm="setForm"></register-form>
      </div>
    </div>
  </div>
</template>
<script>
import FormLogin from "@/components/FormLogin";
import FormRegister from "@/components/FormRegister";
export default {
  name: "login",
  data() {
    return {
      registerForm: {
        email: "",
        password: "",
        confirmPassword: ""
      },
      loginForm: {
        email: "",
        password: ""
      },
      form: "login" //'register
    };
  },

  components: {
    "login-form": FormLogin,
    "register-form": FormRegister
  },
  methods: {
    setForm(val) {
      console.log(val);

      this.form = val;
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
