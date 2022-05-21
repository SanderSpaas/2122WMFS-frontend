import axios from "axios";
export default {
  namespaced: true,
  state() {
    return {
      games: null,
      loading: false,
      user: null,
      chat: null,
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
    getChat(state) {
      return state.chat;
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
    chat(state, chat) {
      state.chat = chat;
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
    //player aan game gaan toevoegen
    async addPlayer({ commit }, { gameId, alias }) {
      console.log("Killing player");
      commit("loading", true);
      try {
        const { response } = await axios.post(
          "http://localhost:8080/api/games/" + gameId,
          {
            alias: alias,
          }
        );
        commit("loading", false);
        console.log(response);
      } catch (e) {
        console.log(e);
        commit("loading", false);
      }
    },
    //chat voor de huidige game gaan ophalen
    async Chat({ commit }, gameId) {
      console.log("Killing player");
      commit("loading", true);
      try {
        const { data } = await axios.get(
          "http://localhost:8080/api/games/" + gameId + "/chat"
        );
        commit("loading", false);
        commit("chat", data.data);
        console.log(data.data);
      } catch (e) {
        console.log(e);
        commit("loading", false);
      }
    },
    //chat gaan posten voor huidige game
    async addChat({ commit, dispatch }, { gameId, message }) {
      console.log("Killing player");
      commit("loading", true);
      try {
        const { response } = await axios.post(
          "http://localhost:8080/api/games/" + gameId + "/chat",
          {
            message: message,
          }
        );
        commit("loading", false);
        console.log(response);
        //nu de messages opnieuw gaan ophalen zodat we kunnnen zien wat we verstuurd hebben
        dispatch("Chat", gameId);
      } catch (e) {
        console.log(e);
        commit("loading", false);
      }
    },
  },
};
