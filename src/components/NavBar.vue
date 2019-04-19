<template>
  <nav class="navbar has-shadow" role="navigation" aria-label="main navigation">
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
  </nav>
</template>

<script>
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
    }
  }
};
</script>
