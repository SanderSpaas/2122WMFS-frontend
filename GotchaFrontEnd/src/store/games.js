import axios from "axios";
export default {
  namespaced: true,
  state() {
    return {
      games: null,
      loading: false,
      user: null,
    };
  },
  getters: {
    getGames(state) {
      return state.games;
    },
    isLoading(state) {
      return state.loading;
    },
    getUserFromGame(state) {
      return state.user;
    },
  },
  mutations: {
    games(state, data) {
      state.games = data;
    },
    userFromGame(state, data) {
      state.user = data;
    },
    loading(state, loading) {
      state.loading = loading;
    },
  },
  actions: {
    async Games({ commit }) {
      console.log("trying to get user info");
      commit("loading", true);
      try {
        const { data } = await axios.get("http://localhost:8080/api/games");
        commit("loading", false);
        console.log(data);
        commit("games", data.data);
      } catch (e) {
        console.log(e);
        commit("loading", false);
      }
    },
    async UserFromGame({ commit }, gameId) {
      console.log("trying to get user info");
      commit("loading", true);
      try {
        const { data } = await axios.get(
          "http://localhost:8080/api/games/" + gameId
        );
        commit("loading", false);
        console.log(data);
        commit("userFromGame", data.data[0]);
      } catch (e) {
        console.log(e);
        commit("loading", false);
      }
    },
    async start({ commit }) {
      console.log("trying to hand out some hits");
      commit("loading", true);
      try {
        const { data } = await axios.get(
          "http://localhost:8080/api/games/1/start"
        );
        commit("loading", false);
        console.log(data);
      } catch (e) {
        console.log(e);
        commit("loading", false);
      }
    },
    async killPlayer({ commit, dispatch }) {
      console.log("Killing player");
      commit("loading", true);
      try {
        const { data } = await axios.post("http://localhost:8080/api/player");
        commit("loading", false);
        console.log(data);
        dispatch("UserFromGame");
      } catch (e) {
        console.log(e);
        commit("loading", false);
      }
    },
    async addPlayer({ commit }, { gameId, alias }) {
      console.log("Killing player");
      commit("loading", true);
      try {
        const { data } = await axios.post(
          "http://localhost:8080/api/games/" + gameId,
          {
            alias: alias,
          }
        );
        commit("loading", false);
        console.log(data);
      } catch (e) {
        console.log(e);
        commit("loading", false);
      }
    },
  },
};
