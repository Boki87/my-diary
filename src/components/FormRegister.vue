<template>
  <form @submit.prevent="register" class="shadow-2 box">
    <div class="field">
      <label class="label">Email</label>
      <div class="control has-icons-left">
        <input
          v-model="email"
          class="input outline-primary"
          type="email"
          placeholder="john.doe@mail.com"
          required
        >
        <span class="icon is-small is-left">
          <i class="fas fa-envelope"></i>
        </span>
      </div>
    </div>

    <div class="field">
      <label class="label">Password</label>
      <div class="control has-icons-left">
        <input
          v-model="password"
          @keyup="passwordCheck"
          class="input"
          type="password"
          placeholder="abc123"
          required
        >
        <span class="icon is-small is-left">
            <i class="fas fa-lock"></i>
          </span>
      </div>
    </div>

    <div class="field">
      <label class="label">Confirm password</label>
      <div class="control has-icons-left">
        <input
          v-model="confirmPassword"
          @keyup="passwordCheck"
          class="input"
          :class="{'is-danger':comparePasswordsError}"
          type="password"
          placeholder="abc123"
          required
        >
        <span class="icon is-small is-left">
            <i class="fas fa-lock"></i>
          </span>
      </div>
      <p v-if="comparePasswordsError" class="help is-danger">Passwords dont match</p>
    </div>

    <div class="field has-text-centered">
      <button type="submit" class="button is-info" :class="{'is-loading': loading}">Register</button>
    </div>
    <div class="field has-text-centered">
      <span class="has-text-grey">
        Allready registered?
        <a @click.prevent="$emit('setForm', 'login')">Login here.</a>
      </span>
    </div>
  </form>
</template>
<script>
import firebase from "firebase";
export default {
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: "",
      comparePasswordsError: false
    };
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    },

    user() {
      return this.$store.getters.user;
    },

    error() {
      return this.$store.getters.error;
    }
  },
  watch: {
    user(val) {
      if (val) {
        this.$router.push("/overview");
      }
    }
  },
  methods: {
    passwordCheck() {
      if (this.password != this.confirmPassword && this.confirmPassword != "") {
        this.comparePasswordsError = true;
      } else {
        this.comparePasswordsError = false;
      }
    },
    register() {
      if (!this.comparePasswordsError) {
        this.$store.dispatch("setLoading", true);
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password)
          .then(data => {
            var userPayload = {
              uid: data.user.uid,
              email: data.user.email
            };

            this.$store.dispatch("setUser", userPayload);
            this.$store.dispatch("setLoading", false);
          })
          .catch(error => {
            console.log(error);
            this.$store.dispatch("setLoading", false);
          });
      } else {
        this.componentError = "Passwords dont match";
      }
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


