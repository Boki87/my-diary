<template>
  <div class="slideInMenu has-background-light" :class="{'hide-sidemenu':menuToggled}">
    <menu-item v-for="item in menuList" :item="item" :key="item.id"></menu-item>
  </div>
</template>
<script>
import MenuItem from "@/components/MenuItem";
export default {
  name: "sideMenu",
  props: ["menuToggled"],
  components: {
    "menu-item": MenuItem
  },
  data() {
    return {
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
  }
};
</script>

