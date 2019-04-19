<template>
  <div
    class="mainContent has-background-white"
    :class="{'main-content-left':menuToggled || $route.name == 'login'}"
  >
    <div class="mainContent-inner">
      <transition
        enter-active-class="animated fadeInLeft faster"
        leave-active-class="animated fadeOutLeft faster"
        mode="out-in"
      >
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>
<script>
export default {
  name: "mainContent",
  props: ["menuToggled"]
};
</script>

