import Vue from "vue";
import Vuex from "vuex";

import auth from "./modules/auth";
import diarys from "./modules/diarys";
import activePages from "./modules/diaryPages"

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        error: null,
        loading: false
    },
    mutations: {
        setLoading(state, payload) {
            state.loading = payload;
        },
        setError(state, payload) {
            state.error = payload;
        }
    },
    actions: {
        setLoading({ commit }, payload) {
            commit("setLoading", payload);
        },
        setError({ commit }, payload) {
            commit("setError", payload);
        }
    },
    getters: {
        loading(state) {
            return state.loading;
        },
        error(state) {
            return state.error;
        }
    },

    modules: {
        auth,
        diarys,
        activePages
    }
});
