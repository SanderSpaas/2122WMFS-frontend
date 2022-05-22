import axios from "axios";
export default {
  namespaced: true,
  state() {
    return {
      games: null,
      game: null,
      loading: false,
      user: null,
      target: null,
      chat: null,
      killer: null,
    };
  },
  getters: {
    getGames(state) {
      return state.games;
    },
    getGame(state) {
      return state.game;
    },
    getDead(state) {
      array.forEach((element) => {});
      //todo de aantal doden en levenden gaan tellen en in array kwakken
      return state.game;
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
    getTarget(state) {
      return state.target;
    },
    getKiller(state) {
      return state.killer;
    },
  },
  mutations: {
    games(state, data) {
      state.games = data;
    },
    game(state, data) {
      state.game = data;
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
    target(state, target) {
      state.target = target;
    },
    killer(state, killer) {
      state.killer = killer;
    },
  },
  actions: {
    //geeft alle games weer
    async Games({ commit }) {
      console.log("trying to get games info");
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
    //info over de huige speler gaan opvragen
    async Game({ commit }, gameId) {
      console.log("trying to get game info");
      commit("loading", true);
      try {
        const { data } = await axios.get(
          "http://localhost:8080/api/games/" + gameId
        );
        commit("loading", false);
        console.log(data);
        commit("game", data.data);
      } catch (e) {
        console.log(e);
        commit("loading", false);
      }
    },
    //info over de huige speler gaan opvragen
    async UserFromGame({ commit }, gameId) {
      console.log("trying to get user info");
      commit("loading", true);
      try {
        const { data } = await axios.get(
          "http://localhost:8080/api/games/" + gameId + "/player"
        );
        commit("loading", false);
        console.log(data);
        commit("userFromGame", data.data);
      } catch (e) {
        console.log(e);
        commit("loading", false);
      }
    },
    //info over het target van de huidige speler gaan opvragen
    async Target({ commit }, gameId) {
      console.log("trying to get target info");
      commit("loading", true);
      try {
        const { data } = await axios.get(
          "http://localhost:8080/api/games/" + gameId + "/target"
        );
        commit("loading", false);
        console.log(data);
        commit("target", data.data);
      } catch (e) {
        console.log(e);
        commit("loading", false);
      }
    },
    //info over het target van de huidige speler gaan opvragen
    async Killer({ commit }, gameId) {
      console.log("trying to get killer info");
      commit("loading", true);
      try {
        const { data } = await axios.get(
          "http://localhost:8080/api/games/" + gameId + "/killer"
        );
        commit("loading", false);
        console.log(data);
        commit("killer", data.data);
      } catch (e) {
        console.log(e);
        commit("loading", false);
      }
    },
    //de targets gaan verdelen, alleen mogelijk door admin
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
