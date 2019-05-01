import firebase from "firebase";
export default {
    state: {
        activePages: []
    },
    mutations: {
        setActivePages(state, payload) {
            state.activePages = payload;
        }
    },
    actions: {
        setActivePages({ commit }, payload) {
            commit("setActivePages", payload);
        }
    },

    getters: {
        activePages(state) {
            return state.activePages;
        }
    }
};
