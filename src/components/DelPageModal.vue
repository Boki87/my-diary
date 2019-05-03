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
        <div class="card">
          <div class="card-header">
            <p class="card-header-title">Confirm</p>
          </div>
          <div class="card-content has-text-centered">
            <p>Sure you want to delete this Page?</p>
            <div>
              <div style="display:flex;justify-content:center;">
                <span class="button is-outlined is-info ma-1" @click="del">Yes</span>
                <span class="button is-outlined is-danger ma-1" @click="closeMe">No</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: "delPageModal",
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
    },

    del() {
      this.$emit("confirm");
      this.closeMe();
    }
  }
};
</script>
