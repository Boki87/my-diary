<template>
  <div style="position:relative">
    
      <div class="diary-search-box">
        <div class="diary-search-text">
          <p class="control has-icons-left">
            <input class="input" type="text" placeholder="Search by name">
            <span class="icon is-small is-left">
              <i class="fas fa-search"></i>
            </span>
          </p>
        </div>

        <div class="diary-search-date">
          <p class="control has-icons-left">
            <flat-pickr
              v-model="date"
              :config="config"
              placeholder="Select a date"
              name="birthdate"
            ></flat-pickr>
            <span class="icon is-small is-left">
              <i class="fas fa-calendar"></i>
            </span>
          </p>
        </div>
      </div>
      <div class="columns" v-if="loading">
        <div class="column is-4 is-offset-4">
          <progress class="progress is-info is-3 mx-auto" max="100"></progress>
        </div>
      </div>
      <div v-else class="diary-pages-wrapper">
        {{pagesForDiary}}
        
        <diary-page v-for="page in pagesForDiary" :page="page" :key="page.id"></diary-page>
        
      </div>
    
      <div @click="$router.push('/page/'+id)" class="float-btn-right-bottom has-background-info has-text-white">
        <i class="fas fa-plus"></i>
      </div>
  </div>
</template>
<script>
import firebase from "firebase";
import DiaryPage from "@/components/DiaryPage"
export default {
  name: "diary",
  props: ["id"],
  components: {
    diaryPage: DiaryPage
  },
  data() {
    return {
      date: new Date(),
      config: {
        altInput: true,
        dateFormat: "d M Y",
        altFormat: "d M Y",
        disableMobile: "true",
        maxDate: new Date()
      },
      pagesForDiary: []
    };
  },
  computed: {
    filteredPages() {
      return this.pagesForDiary.filter(page => {});
    },

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
    getPagesForDiary(id) {
      this.pagesForDiary = [];
      this.$store.dispatch("setLoading", true);
      firebase
        .firestore()
        .collection("pages")
        .where("userId", "==", this.user.uid)
        .where("diaryId", "==", id)
        .get()
        .then(querySnapshot => {
          let pagesFromCloud = [];

          querySnapshot.forEach(doc => {
            let page = doc.data();
            page.id = doc.id;
            pagesFromCloud.push(page);
          });

          this.pagesForDiary = pagesFromCloud;

          this.$store.dispatch("setLoading", false);
        })
        .catch(error => {
          console.log(error);
          this.$store.dispatch("setLoading", false);
        });
    },

    formatDate(date) {
      var d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [year, month, day].join(" ");
    }
  },

  beforeRouteUpdate(to, from, next) {
    // react to route changes...
    // don't forget to call next()

    this.getPagesForDiary(to.params.id);
    next();
  },

  mounted() {
    this.getPagesForDiary(this.id);
  }
};
</script>
<style lang="scss">
.diary-search-box {
  display: flex;
  justify-content: center;
  width: 500px;
  margin: 30px auto;
  @media (max-width: 1088px) {
    width: 80%;
  }

  @media (max-width: 425px) {
    width: 90%;
  }
}

.diary-search-text {
  flex: 8;
}
.diary-search-date {
  flex: 4;
  @media (max-width: 425px) {
    flex: 6;
  }
}

.diary-pages-wrapper {
  height: calc(100vh - 96px);
  padding-bottom: 96px;
  overflow: auto;
  display: flex;
  justify-content: center;
  align-content: flex-start;
  flex-wrap: wrap;
}

.float-btn-right-bottom {
  width:50px;
  height:50px;
  border-radius:100%;
  text-align: center;
  line-height: 50px;
  position: absolute;
  bottom:80px;
  right:30px;
  z-index:2;
  font-size:1.2rem;
  cursor:pointer;
  &:hover {
    filter: brightness(90%)
  }
}
</style>

