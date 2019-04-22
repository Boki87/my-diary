import firebase from "firebase";
export default {
    state: {
        diarys: []
    },
    mutations: {
        setDiarys(state, payload) {
            state.diarys = payload;
        }
    },
    actions: {
        setDiarys({ commit }, payload) {
            commit("setDiarys", payload);
        },

        getDiarys({ commit, getters }) {
            commit("setLoading", true);

            firebase
                .firestore()
                .collection("diarys")
                .where("userId", "==", getters.user.uid)
                .get()
                .then(querySnapshot => {
                    let diarysArr = [];
                    querySnapshot.forEach(doc => {
                        let diary = doc.data();
                        diary.id = doc.id;

                        diarysArr.push(diary);
                    });

                    commit("setDiarys", diarysArr);
                    commit("setLoading", false);
                })
                .catch(error => {
                    console.log(error);
                    commit("setLoading", false);
                });
        }
    },

    getters: {
        diarys(state) {
            return state.diarys;
        }
    }
};
