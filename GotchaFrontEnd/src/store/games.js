import axios from "axios";
export default {
  namespaced: true,
  state() {
    return {
      games: null,
    };
  },
  getters: {
    getData(state) {
      return state.games;
    },
  },
  mutations: {
    data(state, data) {
      state.games = data;
    },
  },
  actions: {
    async getGames({ commit }) {
      console.log("trying to get user info");
      try {
        const { data } = await axios.get("http://localhost:8080/api/games");
        console.log(data);
        commit("data", data);
      } catch (e) {
        console.log(e);
      }
    },
  },
};
