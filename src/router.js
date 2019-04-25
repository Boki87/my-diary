import Vue from "vue";
import Router from "vue-router";
import Login from "@/views/Login";
import Overview from "@/views/Overview";
import Search from "@/views/Search";
import Diary from "@/views/Diary";
import Page from "@/views/Page";

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
        },
        {
            path: "/search",
            name: "search",
            component: Search,
            beforeEnter: authGuard
        },
        {
            path: "/diary/:id",
            name: "diary",
            props: true,
            component: Diary,
            beforeEnter: authGuard
        },
        {
            path: "/page/:id",
            name: "page",
            props: true,
            component: Page,
            beforeEnter: authGuard
        }
    ]
});
