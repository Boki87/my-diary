<template>
  <div class="slideInMenu has-background-light" :class="{'hide-sidemenu':menuToggled}">
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
      @editDiary="editDiary"
      @delDiary="delDiary"
    ></menu-item>

    <new-diary-modal :showModal="newDiaryModal" @close="newDiaryModal = false"></new-diary-modal>

    <div class="addDiaryBtn" @click="newDiaryModal = true">
      <i class="fas fa-plus"></i>
    </div>
  </div>
</template>
<script>
import MenuItem from "@/components/MenuItem";
import NewDiaryModal from "@/components/NewDiaryModal";
export default {
  name: "sideMenu",
  props: ["menuToggled"],
  components: {
    "menu-item": MenuItem,
    NewDiaryModal: NewDiaryModal
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

    editDiary(id) {
      console.log(id);
    },

    delDiary(id) {
      console.log(id);
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


