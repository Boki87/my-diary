import Vue from "vue";
import Router from "vue-router";
import Login from "@/views/Login";
import Overview from "@/views/Overview";
import store from "@/store/store";

Vue.use(Router);

const authGuard = (to, from, next) => {
    if (store.getters.user) {
        next();
    } else {
        next("/");
    }
};

export default new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
        {
            path: "/",
            name: "login",
            component: Login
        },
        {
            path: "/overview",
            name: "overview",
            component: Overview,
            beforeEnter: authGuard
        }
    ]
});
