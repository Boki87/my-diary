<template>
  <transition
    enter-active-class="animated fadeIn faster"
    leave-active-class="animated fadeOut faster"
    mode="in-out"
  >
    <div v-show="showModal" class="modal is-active">
      <div class="modal-background"></div>
      <div
        class="modal-content animated faster"
        :class="{'slideInDown':showModal, 'slideOutUp':!showModal}"
      >
        <!-- Any other Bulma elements you want -->
        <div class="card">
          <header class="card-header">
            <p class="card-header-title">Confirm</p>
          </header>
          <div class="card-content">
            <p>Sure you want to delete this form?</p>
            <div>
              <div class="buttons">
                <span class="button">Yes</span>
                <span class="button" @click="closeMe">No</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import firebase from "firebase";

export default {
  name: "DelDiaryModal",
  props: ["showModal"],
  data() {
    return {};
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
  methods: {
    closeMe() {
      this.$emit("close");
    }
  }
};
</script>
