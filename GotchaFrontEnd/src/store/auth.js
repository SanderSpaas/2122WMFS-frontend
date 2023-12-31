import axios from "axios";
import router from "../router";
export default {
  namespaced: true,
  state() {
    return {
      loggedIn: false,
      authenticated: false,
      user: null,
      loading: false,
    };
  },
  getters: {
    isLoggedin(state) {
      return state.loggedIn;
    },
    isAuthenticated(state) {
      return state.authenticated;
    },
    user(state) {
      return state.user;
    },
    isLoading(state) {
      return state.loading;
    },
  },
  mutations: {
    login(state, action) {
      state.loggedIn = action;
    },
    logout(state, action) {
      state.loggedIn = action;
    },
    setUser(state, user) {
      state.user = user;
    },
    authenticate(state, authenticated) {
      state.authenticated = authenticated;
    },
    loading(state, loading) {
      state.loading = loading;
    },
  },
  actions: {
    async login({ commit, dispatch }, { email, password }) {
      if (this.isAuthenticated) {
        return;
      } else {
        commit("loading", true);
        try {
          await axios.get("/sanctum/csrf-cookie");
          await axios.post("/api/login", {
            email: email,
            password: password,
          });
          commit("loading", false);
          commit("login", true);
          commit("authenticate", true);
          router.push({
            name: "gamelist",
          });
        } catch (e) {
          commit("loading", false);
          return e.response.data;
        }
        dispatch("getUser");
      }
    },
    async register({ commit }, { name, email, password }) {
      if (this.isAuthenticated) {
        return;
      } else {
        commit("loading", true);
        try {
          await axios.get("/sanctum/csrf-cookie");
          await axios.post("/api/user/add", {
            name: name,
            email: email,
            password: password,
          });
          commit("loading", false);
          router.push({
            name: "login",
          });
        } catch (e) {
          commit("loading", false);
          return e.response.data;
        }
      }
    },
    async logout({ commit }) {
      commit("loading", true);
      commit("setUser", {});
      commit("authenticate", false);

      if (document.cookie.indexOf("XSRF-TOKEN") === -1) {
        return;
      }

      // I don't care about the response
      // but it resets the cookie... so... yeah;
      return axios
        .post("/api/logout")
        .catch(() => {
          commit("loading", false);
        })
        .finally(() => {
          // clear cookie to prevent future auto login attempts
          document.cookie =
            "XSRF-TOKEN=;path=/;expires=Thu, 01 Jan 1970 00:00:00 UTC; Secure;";
          commit("loading", false);
          router.push({
            name: "login",
          });
        });
    },
    async tryAutoLogin({ dispatch }) {
      if (document.cookie.indexOf("XSRF-TOKEN") === -1) {
        //geen cookie aanwezig
      } else {
        //cookie aanwezig dus we kunnen auto loginnen nadat we zijn gaan nakijken of we effectief authenticated zijn dmv een getUser
        await dispatch("getUser");
      }
    },
    async getUser({ commit }) {
      commit("loading", true);
      try {
        const { data } = await axios.get("/api/user");
        commit("loading", false);
        commit("login", true);
        commit("authenticate", true);
        commit("setUser", data);
        return true;
      } catch (e) {
        commit("loading", false);
        return false;
      }
    },
  },
};
