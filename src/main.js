import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import firebase from "firebase";
import firebaseConfig from "./firebase-config";

require("@/assets/css/_main.scss");

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App),

    created() {
        firebase.initializeApp(firebaseConfig);
    }
}).$mount("#app");
