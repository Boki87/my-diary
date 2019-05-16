<template>
  <div>
  <div v-if="activePages.length > 0" class="has-text-centered">
    <h2>Your diary pages for today:</h2>
  </div>
   <div class="columns" v-if="loading">
      <div class="column is-4 is-offset-4">
        <progress class="progress is-info is-3 mx-auto" max="100"></progress>
      </div>
    </div>
    
    <div v-else class="diary-pages-wrapper">
      
      <template v-if="activePages.length > 0">
        <diary-page
        v-for="page in activePages"
        :page="page"
        :key="page.id"
        :subtitle="true"
        @showDelPageModal="showDelModal"
      ></diary-page>
      </template>
      <div v-else class="has-text-centered" style="width:100%;height:100%;display:flex;align-items: center;justify-content: center;flex-direction: column;">
        <p>No diary pages for today</p>
        <a @click.prevent="addNewPageModal = true">Create one</a>
      </div>
      

      <del-page-modal
      :showModal="showDelPageModal"
      @confirm="delPage"
      @close="showDelPageModal = false"
    ></del-page-modal>

    <new-diary-page-modal :showModal="addNewPageModal" @close="addNewPageModal = false"></new-diary-page-modal>
    </div>

    <div
      @click="addNewPageModal = true"
      class="float-btn-right-bottom has-background-info has-text-white"
    >
      <i class="fas fa-plus"></i>
    </div>
    </div>
</template>
<script>
import firebase from "firebase";
import DiaryPage from "@/components/DiaryPage";
import DelPageModal from "@/components/DelPageModal";
import NewDiaryPageModal from "@/components/NewDiaryPageModal"
export default {
  name: "overview",
  data() {
    return {      
      date: this.formatDate(+new Date()),
      pageToDelete: null,
      showDelPageModal: false,
      addNewPageModal: false
    };
  },
  components: {
    diaryPage: DiaryPage,
    "del-page-modal": DelPageModal,
    "new-diary-page-modal":NewDiaryPageModal
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

     activePages() {
      return this.$store.getters.activePages;
    }
  },

  methods: {
    formatDate(date) {
      var d = new Date(date),
        day = "" + d.getDate(),
        year = d.getFullYear();

      var monthShortNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ];

      var month = monthShortNames[d.getMonth()];

      if (day.length < 2) day = "0" + day;
      return [day, month, year].join(" ");
    },

    getPagesForToday() {
      

      this.pagesForDiary = [];
      this.$store.dispatch("setLoading", true);
      firebase
        .firestore()
        .collection("pages")
        .where("date", "==", this.date)
        .where("userId", "==", this.user.uid)
        .get()
        .then(querySnapshot => {
          let pagesFromCloud = [];

          querySnapshot.forEach(doc => {
            let page = doc.data();
            page.id = doc.id;
            pagesFromCloud.push(page);
          });
          
          // this.pagesForDiary = pagesFromCloud;
          this.$store.dispatch("setActivePages", pagesFromCloud);
          
          this.$store.dispatch("setLoading", false);
        })
        .catch(error => {
          console.log(error);
          this.$store.dispatch("setLoading", false);
        });
    },
    delPage() {
      this.$store.dispatch("setLoading", true);
      firebase
        .firestore()
        .collection("pages")
        .doc(this.pageToDelete)
        .delete()
        .then(() => {          

          let newPagesForToday = this.activePages.filter(d => {
            if (d.id != this.pageToDelete) return d;
          });
                
                
          this.$store.dispatch("setActivePages", newPagesForToday);
          this.showDelPageModal = false;
          this.$store.dispatch("setLoading", false);
        })
        .catch(error => {
          console.log(error);
          this.$store.dispatch("setLoading", false);
        });
    },
    showDelModal(id) {
      this.pageToDelete = id;
      this.showDelPageModal = true;
    }
  },
  mounted() {
    this.getPagesForToday();
  }
};
</script>
<style lang="scss">
</style>
