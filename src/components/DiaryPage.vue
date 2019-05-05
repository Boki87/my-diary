<template>
  <div class="page-thumb shadow-1">
    <div class="page-thumb-title">{{ page.title }}</div>
    <div class="page-thumb-count" v-html="wordCount"></div>

    <div class="page-thumb-footer">
      <div class="page-thumb-open" @click="$router.push('/page/'+page.id)">
        <i class="fas fa-pencil-alt"></i>
      </div>
      <div class="page-thumb-delete" @click="showDelModal">
        <i class="fas fa-trash-alt"></i>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "DiaryPage",
  props: ["page"],
  methods: {
    strip_html_tags(str) {
      var str = str.toString();
      return str.replace(/<\/?[^>]+(>|$)/g, " ");
    }
  },
  computed: {
    wordCount() {
      return this.page.data;
    }
  },
  methods: {
    showDelModal() {
      this.$emit("showDelPageModal", this.page.id);
    }
  }
};
</script>

<style lang="scss">
.page-thumb {
  width: 300px;
  height: 300px;
  position: relative;
  margin: 10px;
  overflow: hidden;
}

.page-thumb-footer {
  position: absolute;
  width: 100%;
  height: 40px;
  bottom: 0px;
  left: 0px;
  display: flex;
  line-height: 40px;
  text-align: center;
  color: #fff;
}
.page-thumb-open {
  cursor: pointer;
  flex: 1;
  background-color: #8b8b8b;
  &:hover {
    filter: brightness(90%);
  }
}
.page-thumb-delete {
  cursor: pointer;
  flex: 1;
  background-color: #c2c2c2;
  &:hover {
    filter: brightness(90%);
  }
}
.page-thumb-title {
  font-size: 1.2rem;
  padding: 10px;
  background-color: #e4e1e1;
}

.page-thumb-count {
  font-size: 1rem;
  padding-left: 10px;
}
</style>
