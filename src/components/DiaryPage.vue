<template>
  <div class="page-thumb shadow-1">
    
    <div class="page-thumb-title" @click="$router.push('/page/'+page.id)">
     <span v-if="subtitle" class="icon" :class="colorTag">
          <i class="fas fa-tag"></i>
        </span>
      {{ page.title }}
      </div>
    
    <div class="page-thumb-count" v-html="pageData"></div>

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
import { setTimeout } from 'timers';
export default {
  name: "DiaryPage",
  props: ["page","subtitle"],
  data() {
    return {
      colorTag:'',
      diaryName:''
    }
    
  },
  computed: {
    diarys() {
      return this.$store.getters.diarys;
    },
    pageData() {

      return this.page.data;      
    }
  },
  
  methods: {
    showDelModal() {
      this.$emit("showDelPageModal", this.page.id);
    }
  },
  created() {
    this.diarys.forEach(d => {              
         if(d.id == this.page.diaryId) {
            this.colorTag = d.colorTag
            this.diaryName = d.name
        }
      })
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
  cursor:pointer;
  &:hover {
    filter: brightness(90%);
  }
}

.page-thumb-subTitle {
  font-size: 0.7rem;
  padding: 10px;
}

.page-thumb-count {
  font-size: 1rem;
  padding-left: 10px;
}
</style>
