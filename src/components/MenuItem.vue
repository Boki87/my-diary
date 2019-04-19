<template>
  <div v-if="item.type == 'subtitle'">
    <div class="menu-item menu-item-subtitle">
      <span>{{ item.name }}</span>
    </div>
  </div>
  <div v-else class="hoverMe">
    <div class="menu-item menu-item-title">
      <span class="icon" :class="item.colorTag">
        <i class="fas" :class="item.icon"></i>
      </span>
      <span>{{ item.name }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "menuItem",
  props: ["item"]
};
</script>
<style lang="scss">
.menu-item {
  height: 30px;
  line-height: 30px;
  background: inherit;
  cursor: pointer;
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
