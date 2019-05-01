import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import firebase from "firebase";
import firebaseConfig from "./firebase-config";



import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";

Vue.component("flatPickr", flatPickr);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App),

    created() {
        firebase.initializeApp(firebaseConfig);

        
        
        this.$store.dispatch("setLoading", true);
        firebase.auth().onAuthStateChanged(user => {
        
            
            if (user) {
                let userPayload = {
                    uid: user.uid,
                    email: user.email
                };

                this.$store.dispatch("setUser", userPayload);
                this.$store.dispatch("setLoading", false);
        
                
            }else{
                this.$store.dispatch("setLoading", false);
            }
        });
    }
}).$mount("#app");
