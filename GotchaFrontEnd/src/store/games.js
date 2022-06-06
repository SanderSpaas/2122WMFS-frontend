import axios from "axios";
import router from "../router";
export default {
  namespaced: true,
  state() {
    return {
      games: null,
      game: null,
      loading: false,
      chat: null,
    };
  },
  getters: {
    getGames(state) {
      return state.games;
    },
    getGame(state) {
      return state.game;
    },
    isLoading(state) {
      return state.loading;
    },
    getChat(state) {
      return state.chat;
    },
  },
  mutations: {
    games(state, data) {
      state.games = data;
    },
    game(state, data) {
      state.game = data;
    },
    loading(state, loading) {
      state.loading = loading;
    },
    chat(state, chat) {
      state.chat = chat;
    },
  },
  actions: {
    //geeft alle games weer
    async Games({ commit }) {
      console.log("trying to get games info");
      commit("loading", true);
      try {
        const { data } = await axios.get("/api/games");
        commit("loading", false);
        console.log(data);
        commit("games", data.data);
      } catch (e) {
        console.log(e);
        commit("loading", false);
      }
    },
    //info over de game met alle spelers
    async Game({ commit }, gameId) {
      console.log("trying to get game info with id: " + gameId);
      commit("game", null);
      commit("loading", true);
      try {
        const { data } = await axios.get("/api/games/" + gameId);
        commit("loading", false);
        console.log(data);
        commit("game", data.data);
      } catch (e) {
        //game bestaat niet dus user gaan weghalen van de pagina
        router.push({
          name: "gamelist",
        });
        commit("loading", false);
      }
    },
    async killPlayer({ commit, dispatch }, { gameId, targetID }) {
      console.log("Killing player");
      commit("loading", true);
      try {
        const { data } = await axios.patch(
          "/api/player/" + gameId + "/" + targetID
        );
        commit("loading", false);
        console.log(data);
        dispatch("Game", gameId);
      } catch (e) {
        router.push({
          name: "gamelist",
        });
        commit("loading", false);
      }
    },
    //player aan game gaan toevoegen
    async addPlayer({ commit }, { gameId, alias }) {
      console.log("adding player");
      commit("loading", true);
      try {
        await axios.post("/api/games/" + gameId + "/add", {
          alias: alias,
        });
        commit("loading", false);
        router.push({
          name: "game",
          params: {
            gameId: gameId,
          },
        });
      } catch (e) {
        console.log(e);
        commit("loading", false);
        return e.response.data;
      }
    },
    //chat voor de huidige game gaan ophalen
    async Chat({ commit }, gameId) {
      console.log("getting chats");
      commit("loading", true);
      try {
        const { data } = await axios.get("/api/games/" + gameId + "/chat");
        commit("loading", false);
        commit("chat", data.data);
        console.log(data.data);
      } catch (e) {
        console.log(e);
        router.push({
          name: "gamelist",
        });
        commit("loading", false);
      }
    },
    //chat gaan posten voor huidige game
    async addChat({ commit, dispatch }, { gameId, message }) {
      console.log("sending chat");
      commit("loading", true);
      try {
        await axios.post("/api/games/" + gameId + "/chat", {
          message: message,
        });
        commit("loading", false);
        //nu de messages opnieuw gaan ophalen zodat we kunnnen zien wat we verstuurd hebben
        dispatch("Chat", gameId);
      } catch (e) {
        console.log(e);
        router.push({
          name: "gamelist",
        });
        commit("loading", false);
      }
    },
    //chat bericht gaan verwijderen
    async removeChat({ commit, dispatch }, { gameId, chatId }) {
      commit("loading", true);
      console.log(gameId);
      try {
        const { data } = await axios.delete(
          "/api/games/" + gameId + "/chat/" + chatId
        );
        commit("loading", false);
        //nu de messages opnieuw gaan ophalen zodat we kunnnen zien wat we verwijderd hebben
        dispatch("Chat", gameId);
        console.log(data.data);
      } catch (e) {
        console.log(e);
        router.push({
          name: "gamelist",
        });
        commit("loading", false);
      }
    },
  },
};
