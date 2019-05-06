<template>
  <div>
    <app-navbar
      v-show="$route.name != 'login'"
      @toggle="menuToggled = !menuToggled"
      :menuToggled="menuToggled"
    ></app-navbar>
    <app-sidemenu :menuToggled="menuToggled" v-if="$route.name != 'login'"></app-sidemenu>
    <app-main-content :menuToggled="menuToggled"></app-main-content>
  </div>
</template>
<script>
import NavBar from "@/components/NavBar";
import SideMenu from "@/components/SideMenu";
import MainContent from "@/components/MainContent";
export default {
  components: {
    "app-navbar": NavBar,
    "app-sidemenu": SideMenu,
    "app-main-content": MainContent
  },

  data() {
    return {
      menuToggled: false
    };
  },
  mounted() {
    window.addEventListener("resize", () => {
      if (window.innerWidth < 1088) {
        this.menuToggled = true;
      } else {
        this.menuToggled = false;
      }
    });
  }
};
</script>

<style lang="scss">
@import "https://use.fontawesome.com/releases/v5.8.1/css/all.css";

@import "./assets/css/Animate.css";
@import "./assets/css/main.scss";
</style>
