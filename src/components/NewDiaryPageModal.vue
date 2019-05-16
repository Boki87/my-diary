<template>
  <transition
    enter-active-class="animated fadeIn faster"
    leave-active-class="animated fadeOut faster"
    mode="in-out"
  >
    <div v-show="showModal" class="modal is-active" style="z-index:600;">
      <div class="modal-background"></div>
      <div
        class="modal-content animated faster"
        :class="{'slideInDown':showModal, 'slideOutUp':!showModal}"
      >
        <div class="card">
          <div class="card-header">
            <p class="card-header-title">Add a new Page</p>
          </div>
          <div class="card-content has-text-centered">
            
              <h3 style="text-decoration:underline">Pick Diary:</h3>
              <ul class="menu-list" style="list-style:none;width:100%;margin:0px;padding:0px;">
                  <li v-for="diary in diarys" :key="diary.id" @click.prevent="addToDiary(diary.id)"><a>{{ diary.name }}</a></li>                  
              </ul>
            
          </div>
        </div>
      </div>
      <button class="modal-close is-large" aria-label="close" @click="closeMe"></button>
    </div>
  </transition>
</template>
<script>
export default {
  name: "newDiaryPageModal",
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
    },
    diarys() {
      return this.$store.getters.diarys;
    }
  },
  methods: {
    closeMe() {
      this.$emit("close");
    },

    addToDiary(id) {
        this.closeMe()
        this.$router.push('/new-page/'+id)
    }
  }
};
</script>
