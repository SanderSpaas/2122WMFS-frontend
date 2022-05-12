import { createStore } from "vuex";
import auth from "./auth";
import games from "./games";
// don't just export an object!
// export a STORE
export default createStore({
  // state, getters, mutations, actions
  getters: {},
  mutations: {},
  setters: {},
  actions: {},
  modules: {
    auth,
    games,
  },
});
