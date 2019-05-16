<template>
  <div class="pa-2">
      <div class="column is-8 is-offset-2">
        <div style="display:flex">
          <div class="field" style="flex:7">
            <label class="label">Search by Title</label>
            <p class="control has-icons-left">
              <span class="icon is-small is-left">
                <i class="fas fa-search"></i>
              </span>
              <input
              @keyup="searchFlag = true"
              v-model="searchTitle"
              class="input outline-primary"
              type="text"
              placeholder="Page Title"
              required
            >
            </p>
            
          </div>
          <div class="field" style="flex:4;margin-left:10px;position:relative">
            <label class="label">Search by Date</label>
              
            <p class="control has-icons-left">
              <flat-pickr
                @keyup="searchFlag = true"
                v-model="date"
                :config="config"
                placeholder="Select a date"
                name="birthdate"
              ></flat-pickr>
              <span class="icon is-small is-left">
                <i class="fas fa-calendar"></i>
              </span>              
              <i @click="date = ''" class="fas fa-times" style="position:absolute;top:10px;right:7px;z-index:200;cursor:pointer;"></i>
            </p>
          </div>
        
      </div>
    </div>
    <div class="diary-pages-wrapper">
      
      <template v-if="activePages.length > 0">      
        <diary-page
        v-for="page in searchedPages"
        :page="page"
        :key="page.id"
        :subtitle="true"
        @showDelPageModal="showDelModal"
      ></diary-page>
      </template>
      <div v-if="searchedPages.length == 0 && searchFlag == true" class="has-text-centered" style="width:100%;height:100%;display:flex;align-items: center;justify-content: center;flex-direction: column;">
        <p>No pages for this query</p>        
      </div>

      <del-page-modal
      :showModal="showDelPageModal"
      @confirm="delPage"
      @close="showDelPageModal = false"
    ></del-page-modal>

    </div>
 
  </div>
</template>
<script>
import firebase from "firebase";
import DiaryPage from "@/components/DiaryPage";
import DelPageModal from "@/components/DelPageModal";
import NewDiaryPageModal from "@/components/NewDiaryPageModal"
export default {
  name: "search",

  data() {
    return {  
      searchFlag: false,
      searchTitle: '',
      date: '',
      config: {
        altInput: true,
        dateFormat: "d M Y",
        altFormat: "d M Y",
        disableMobile: "true",
        maxDate: new Date()
      },
      pageToDelete: null,
      showDelPageModal: false,
      addNewPageModal: false
    }
  },
  components: {
    diaryPage: DiaryPage,
    "del-page-modal": DelPageModal,
    "new-diary-page-modal":NewDiaryPageModal
  },
  computed: {
    searchedPages() {
      
      let searchedPages = []

      searchedPages = this.activePages.filter(d => {          
        
        
          if(this.searchTitle.length > 0 && this.date == '') {
            
            if(d.title.toLowerCase().includes(this.searchTitle.toLowerCase())) {
              return d
            }
          }

          if(this.searchTitle == '' && this.date != '') {         
            console.log(222);
             
              if(d.date == this.date) {
                return d
              }
          }

          if(this.searchTitle != '' && this.date != '') {  
            if(d.title.toLowerCase().includes(this.searchTitle.toLowerCase()) && d.date == this.date) {
                return d
              }
          }
        })
        return searchedPages
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
    getAllPages() {      
      this.$store.dispatch("setLoading", true);
      firebase
        .firestore()
        .collection("pages")
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
    this.getAllPages();
  }
};
</script>

