<template>
  <nav class="app-navbar has-shadow" role="navigation" aria-label="main navigation">
    <a
      role="button"
      class="navbar-burger burger"
      :class="{'is-active':burgerMenuActive}"
      style="position:fixed;top:0px;left:0px;"
      aria-label="menu"
      aria-expanded="false"
      data-target="navbarBasicExample"
      @click="toggle"
    >
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>

    <!-- <div class="navbar-item mx-auto max-w-300">
      <input class="input" type="search" placeholder="Search forum...">
    </div>-->

    <div style="float:right;">
      <a @click.prevent="logout" class="button is-light mt-1 mr-2">
        Log out
        <i class="fas fa-sign-out-alt ml-2"></i>
      </a>
    </div>
  </nav>
</template>

<script>
import firebase from "firebase";
export default {
  name: "navBar",
  data() {
    return {
      burgerMenuActive: false
    };
  },
  methods: {
    toggle() {
      this.burgerMenuActive = !this.burgerMenuActive;
      this.$emit("toggle");
    },
    logout() {
      this.$store.dispatch("setLoading", true);
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$store.dispatch("setLoading", false);
          // Sign-out successful.
          this.$store.dispatch("setUser", null);
          this.$router.push("/");
        })
        .catch(error => {
          // An error happened
          this.$store.dispatch("setLoading", false);
        });
    }
  }
};
</script>
<style lang="scss">
.app-navbar {
  height: 51px;
  border-bottom: 1px solid hsl(0, 0%, 86%);
}
</style>
