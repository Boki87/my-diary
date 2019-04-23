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
            <p class="card-header-title">Add new Diary</p>
          </header>
          <div class="card-content">
            <form @submit.prevent="formSubmit">
              <div class="columns">
                <div class="column is-9">
                  <label class="label">Name:</label>
                  <div class="control">
                    <input
                      maxlength="20"
                      v-model="diaryToEdit.name"
                      class="input outline-primary"
                      :class="{'is-danger':1==2}"
                      type="text"
                      placeholder="My Diary Name"
                      required
                    >
                  </div>
                  <p v-if="1==2" class="help is-danger">Error here</p>
                </div>

                <div class="column">
                  <label class="label">Color Tag:</label>
                  <div class="control">
                    <div class="select">
                      <select v-model="diaryToEdit.colorTag">
                        <option value="text-red">Red</option>
                        <option value="text-green">Green</option>
                        <option value="text-blue" selected>Blue</option>
                        <option value="text-yellow">Yellow</option>
                      </select>
                    </div>
                  </div>
                  <p v-if="1==2" class="help is-danger">Error here</p>
                </div>
              </div>

              <div class="columns">
                <div class="column has-text-centered">
                  <button
                    type="submit"
                    class="button is-outlined is-info"
                    :class="{'is-loading':loading}"
                  >Save</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <button class="modal-close is-large" aria-label="close" @click="closeMe"></button>
    </div>
  </transition>
</template>
<script>
import firebase from "firebase";

export default {
  name: "EditDiaryModal",
  props: ["showModal", "diaryId"],
  data() {
    return {
      editDiary: {
        name: "",
        colorTag: "text-blue"
      }
    };
  },
  computed: {
    diaryToEdit() {
      let editDiary = this.diarys.filter(d => {
        if (d.id == this.diaryId) return d;
      });

      let diaryCopy = { ...editDiary[0] };

      return diaryCopy;
    },
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

    formSubmit() {
      this.$store.dispatch("setLoading", true);
      firebase
        .firestore()
        .collection("diarys")
        .doc(this.diaryId)
        .update(this.diaryToEdit)
        .then(() => {
          let diarys = [...this.diarys];

          diarys.forEach(d => {
            if (d.id == this.diaryId) {
              d.name = this.diaryToEdit.name;
              d.colorTag = this.diaryToEdit.colorTag;
            }
          });
          this.$store.dispatch("setDiarys", diarys);
          this.$store.dispatch("setLoading", false);

          this.closeMe();
        })
        .catch(error => {
          console.log(error);
          this.$store.dispatch("setLoading", false);
          this.closeMe();
        });
    }
  }
};
</script>
