<template>
  <div v-if="item.type == 'subtitle'">
    <div class="menu-item menu-item-subtitle">
      <span>{{ item.name }}</span>
    </div>
  </div>
  <div v-else class="hoverMe">
    <div class="menu-item menu-item-title" :class="{'m-item-active':item.id == activeItem}">
      <div @click="activateMe" style="flex:1">
        <span class="icon" :class="item.colorTag">
          <i class="fas" :class="icon"></i>
        </span>
        <span>{{ item.name }}</span>
      </div>

      <div style v-if="item.to != '/overview' && item.to != '/search'">
        <span @click="$emit('editDiary', item.id)" class="icon text-blue">
          <i class="fas fa-edit"></i>
        </span>
        <span @click="$emit('delDiary', item.id)" class="icon text-red">
          <i class="fas fa-trash"></i>
        </span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "menuItem",
  props: ["item", "activeItem"],
  computed: {
    icon() {
      if (this.item.to != "/overview" && this.item.to != "/search") {
        return "fa-book";
      } else {
        return this.item.icon;
      }
    },

    pathTo() {
      if (this.item.to) {
        return this.item.to;
      } else {
        return `/diary/${this.item.id}`;
      }
    }
  },
  methods: {
    activateMe() {
      this.$router.push(this.pathTo);
      this.$emit("setActiveItem", this.item.id);
    }
  }
};
</script>
<style lang="scss">
.menu-item {
  height: 30px;
  line-height: 30px;
  background: inherit;
  cursor: pointer;
  display: flex;
}

.m-item-active {
  background: inherit;
  filter: brightness(85%);
}

.menu-item-subtitle {
  padding-left: 15px;
  color: #666;
}

.menu-item-title {
  padding-left: 20px;
  color: #444;
  background: inherit;
}

.hoverMe {
  background: inherit;
  &:hover {
    filter: brightness(95%);
  }
}
</style>
