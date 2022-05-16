import axios from "axios";
import router from "../router";
export default {
  namespaced: true,
  state() {
    return {
      loggedIn: false,
      authenticated: false,
      user: null,
      error: null,
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
    error(state) {
      return state.error;
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
    setError(state, error) {
      state.error = error;
    },
    loading(state, loading) {
      state.loading = loading;
    },
  },
  actions: {
    async login({ commit, dispatch }, { email, password }) {
      if (this.isAuthenticated) {
        console.log("you are already logged in");
      } else {
        console.log("Trying to log you in: " + email + " " + password);
        commit("loading", true);
        try {
          await axios.get("http://localhost:8080/sanctum/csrf-cookie");
          const { data } = await axios.post("http://localhost:8080/api/login", {
            email: email,
            password: password,
          });
          commit("loading", false);
          console.log(data);
          commit("login", true);
          commit("authenticate", true);
          router.push({
            name: "gamelist",
          });
        } catch (e) {
          console.log(e);
          if (e.response.status === 401) {
            commit("setError", "Your password or email is incorrect");
          } else {
            commit("setError", e);
          }
          commit("loading", false);
        }
        dispatch("getUser");
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
        .post("http://localhost:8080/api/logout")
        .catch(() => {
          commit("loading", false);
        })
        .finally(() => {
          // clear cookie to prevent future auto login attempts
          document.cookie =
            "XSRF-TOKEN=;path=/;expires=Thu, 01 Jan 1970 00:00:00 UTC; Secure;";
          commit("loading", false);
          router.push("/login");
        });
    },
    async tryAutoLogin({ commit, dispatch }) {
      console.log("trying to log you in sir");
      if (document.cookie.indexOf("XSRF-TOKEN") === -1) {
        //geen cookie aanwezig
        console.log("looks like you don't have a cookie bad boy");
      } else {
        //cookie aanwezig dus we kunnen auto loginnen nadat we zijn gaan nakijken of we effectief authenticated zijn dmv een getUser
        const isValid = await dispatch("getUser");
        // if (isValid) {
          commit("authenticate", true);
          commit("login", true);
          console.log("ooh yeah thats the stuff im logged in bb");
        // }
        //anders niets gaan doen
      }
    },
    async getUser({ commit }) {
      commit("loading", true);
      console.log("trying to get user info");
      try {
        const { data } = await axios.get("http://localhost:8080/api/user");
        commit("loading", false);
        console.log(data);
        commit("login", true);
        commit("authenticate", true);
        commit("setUser", data);
        return true;
      } catch (e) {
        console.log(e);
        commit("loading", false);
        return false;
      }
    },
  },
};
