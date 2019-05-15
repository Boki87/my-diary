<template>
  <div>{{ pagesForToday }}</div>
</template>
<script>
import firebase from "firebase";
export default {
  name: "overview",
  data() {
    return {
      pagesForToday: [],
      date: this.formatDate(+new Date())
    };
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
      console.log(1111);

      this.pagesForDiary = [];
      this.$store.dispatch("setLoading", true);
      firebase
        .firestore()
        .collection("pages")
        .where("date", "==", this.date)
        .get()
        .then(querySnapshot => {
          let pagesFromCloud = [];

          querySnapshot.forEach(doc => {
            let page = doc.data();
            page.id = doc.id;
            pagesFromCloud.push(page);
          });
          console.log(pagesFromCloud);
          // this.pagesForDiary = pagesFromCloud;
          this.pagesForToday = pagesFromCloud;
          this.$store.dispatch("setLoading", false);
        })
        .catch(error => {
          console.log(error);
          this.$store.dispatch("setLoading", false);
        });
    }
  },
  mounted() {
    this.getPagesForToday();
  }
};
</script>
<style lang="scss">
</style>
