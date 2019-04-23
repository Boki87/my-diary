<template>
  <div class="slideInMenu has-background-light" :class="{'hide-sidemenu':menuToggled}">
    <img src="../assets/logo-small.png" class="is-block mx-auto mt-3 mb-3" style="height:40px;" alt>
    <menu-item
      v-for="item in menuList"
      :item="item"
      :key="item.id"
      :activeItem="activeItem"
      @setActiveItem="setActiveItem"
    ></menu-item>
    <menu-item
      v-for="item in diarys"
      :key="item.id"
      :item="item"
      :activeItem="activeItem"
      @setActiveItem="setActiveItem"
      @editDiary="editDiaryOpen"
      @delDiary="delDiaryOpen"
    ></menu-item>

    <new-diary-modal :showModal="newDiaryModal" @close="newDiaryModal = false"></new-diary-modal>
    <edit-diary-modal
      :showModal="editDiaryModal"
      @close="editDiaryModal = false"
      :diaryId="diaryToEdit"
    ></edit-diary-modal>
    <del-diary-modal
      :showModal="delDiaryModal"
      @close="delDiaryModal = false"
      @deleteDiary="deleteDiary"
    ></del-diary-modal>

    <div class="addDiaryBtn" @click="newDiaryModal = true">
      <i class="fas fa-plus"></i>
    </div>
  </div>
</template>
<script>
import firebase from "firebase";
import MenuItem from "@/components/MenuItem";
import NewDiaryModal from "@/components/NewDiaryModal";
import DelDiaryModal from "@/components/DelDiaryModal";
import EditDiaryModal from "@/components/EditDiaryModal";
export default {
  name: "sideMenu",
  props: ["menuToggled"],
  components: {
    "menu-item": MenuItem,
    NewDiaryModal: NewDiaryModal,
    DelDiaryModal: DelDiaryModal,
    EditDiaryModal: EditDiaryModal
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
  data() {
    return {
      activeItem: 1,
      editDiaryModal: false,
      delDiaryModal: false,
      newDiaryModal: false,

      diaryToDelete: null,
      diaryToEdit: null,

      menuList: [
        { id: 0, name: "Overview", type: "subtitle" },
        {
          id: 1,
          name: "Today",
          to: "/overview",
          type: "title",
          colorTag: "text-blue",
          icon: "fa-calendar-alt"
        },
        {
          id: 2,
          name: "Search All",
          to: "/search",
          type: "title",
          colorTag: "text-purple",
          icon: "fa-search"
        },
        { id: 3, name: "My Diary's", type: "subtitle" }
      ]
    };
  },
  methods: {
    setActiveItem(id) {
      this.activeItem = id;
    },

    editDiaryOpen(id) {
      this.diaryToEdit = id;
      this.editDiaryModal = true;
    },

    delDiaryOpen(id) {
      this.diaryToDelete = id;
      this.delDiaryModal = true;
    },

    backToOverview() {
      this.$router.push("/overview");
      this.activeItem = 1;
    },

    deleteDiary() {
      this.$store.dispatch("setLoading", true);
      firebase
        .firestore()
        .collection("diarys")
        .doc(this.diaryToDelete)
        .delete()
        .then(() => {
          console.log("Diary deleted");

          const newDiarys = this.diarys.filter(d => {
            if (d.id != this.diaryToDelete) return d;
          });

          this.$store.dispatch("setDiarys", newDiarys);
          this.delDiaryModalShow = false;
          this.$store.dispatch("setLoading", false);
          this.backToOverview();
        })
        .catch(error => {
          console.log(error);
          this.$store.dispatch("setLoading", false);
        });
    }
  },
  mounted() {
    this.activeItem = 1;
    this.$store.dispatch("getDiarys");
  }
};
</script>
<style lang="scss">
.addDiaryBtn {
  position: absolute;
  bottom: 10px;
  right: 10px;
  font-size: 1.5rem;
  width: 2rem;
  height: 2rem;
  border-radius: 100%;
  background: inherit;
  text-align: center;
  line-height: 2rem;
  cursor: pointer;
  &:hover {
    filter: brightness(95%);
  }
}
</style>


