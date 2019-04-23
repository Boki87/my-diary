<template>
  <div>
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
        <flat-pickr
          :value="date"
          @on-change="setDate"
          :config="config"
          placeholder="Select a date"
          name="birthdate"
        ></flat-pickr>
      </div>
    </div>
    <p>{{ datePicked}}</p>
  </div>
</template>
<script>
import firebase from "firebase";
export default {
  name: "diary",
  props: ["id"],
  data() {
    return {
      datePicked: "",
      config: {
        altFormat: "Y-m-d",
        altInput: true
      },
      pagesForDiary: []
    };
  },
  computed: {
    date() {
      let dateTime = new Date();
      let fullDate =
        dateTime.getFullYear() +
        "-" +
        dateTime.getMonth() +
        "-" +
        dateTime.getDay();
      return fullDate;
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
    setDate(date) {
      let datePicked = new Date(date);
      let fullDate =
        datePicked.getFullYear() +
        "-" +
        datePicked.getMonth() +
        "-" +
        datePicked.getDay();
      this.datePicked = fullDate;
    },
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

      return [year, month, day].join("-");
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
    width: 90%;
  }
}

.diary-search-text {
  flex: 8;
}
.diary-search-date {
  flex: 3;
  @media (max-width: 1088px) {
    flex: 4;
  }
}
</style>

