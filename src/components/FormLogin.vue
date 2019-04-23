<template>
  <form @submit.prevent class="shadow-2 box">
    <div v-if="loading" class="field has-text-centered">
      <h4>Logging you in</h4>
    </div>

    <div v-else>
      <div class="field">
        <label class="label">Email</label>
        <div class="control has-icons-left">
          <input
            v-model="email"
            class="input outline-primary"
            :class="{'is-danger':emailError}"
            type="email"
            placeholder="john.doe@mail.com"
            required
          >
          <span class="icon is-small is-left">
            <i class="fas fa-envelope"></i>
          </span>
        </div>
        <p v-if="emailError" class="help is-danger">This email is invalid</p>
      </div>

      <div class="field">
        <label class="label">Password</label>
        <div class="control">
          <input
            v-model="password"
            class="input"
            :class="{'is-danger':passError}"
            type="password"
            placeholder="abc123"
            required
          >
        </div>
        <p v-if="passError" class="help is-danger">This password is invalid</p>
      </div>

      <div class="field has-text-centered">
        <button
          @click="emailLogin"
          type="submit"
          class="button is-info"
          :class="{'is-loading': loading}"
        >Login</button>
      </div>
      <div class="field has-text-centered">
        <span class="has-text-grey">
          Dont have an account?
          <a @click.prevent="$emit('setForm', 'register')">Register here.</a>
        </span>
        <br>
        <span class="has-text-grey">Or login with Google</span>
      </div>
      <div class="field">
        <span @click="googleLogin" class="social-login shadow-1">
          <img src="../assets/google-logo.png" alt>
        </span>
      </div>
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
      emailError: null,
      passError: null
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
    googleLogin() {
      this.$store.dispatch("setError", null);
      const provider = new firebase.auth.GoogleAuthProvider();

      this.$store.dispatch("setLoading", true);

      firebase
        .auth()
        .signInWithPopup(provider)
        .then(res => {
          this.$store.dispatch("setLoading", false);

          const userPayload = {
            uid: res.user.uid,
            email: res.user.email
          };
          console.log(userPayload);

          this.$store.dispatch("setUser", userPayload);
        })
        .catch(err => {
          this.$store.dispatch("setError", "Server error");
          this.$store.dispatch("setLoading", false);
        });
    },

    emailLogin() {
      if (this.email == "" && this.password == "") {
        return;
      }

      this.$store.dispatch("setError", null);
      this.$store.dispatch("setLoading", true);
      //clear errors here
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(data => {
          this.$store.dispatch("setLoading", false);

          const userPayload = {
            uid: data.user.uid,
            email: data.user.email
          };

          this.$store.dispatch("setUser", userPayload);
        })
        .catch(error => {
          console.log(error);
          if (error.code == "auth/user-not-found") {
            this.emailError = true;
          } else if (error.code == "auth/wrong-password") {
            this.passError = true;
          }

          // this.$store.dispatch("setError", error.message);
          this.$store.dispatch("setLoading", false);
          //set errors here
        });
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


