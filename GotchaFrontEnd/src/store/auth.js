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
  },
  actions: {
    async login({ commit }, { email, password }) {
      if (this.isAuthenticated) {
        console.log("you are already logged in");
      } else {
        console.log("Trying to log you in: " + email + " " + password);
        try {
          await axios.get("http://localhost:8080/sanctum/csrf-cookie");
          const { data } = await axios.post("http://localhost:8080/api/login", {
            email: email,
            password: password,
          });
          console.log(data);
          commit("login", true);
          commit("authenticate", true);
          commit("setUser", email);
          router.push("/home");
        } catch (e) {
          console.log(e);
          if (e.response.status === 401) {
            commit("setError", "Your password or email is incorrect");
          } else {
            commit("setError", e.response.status);
          }
        }
      }
      //userdata gaan ophalen
      try {
        const { data } = await axios.get("http://localhost:8080/user");
        console.log(data);
        commit("login", true);
        commit("authenticate", true);
        commit("setUser", "sander.spaas@odisee.be");
      } catch (e) {
        console.log(e);
      }
    },
    async logout({ commit }) {
      commit("setUser", {});
      commit("authenticate", false);
      router.push("/login");
      if (document.cookie.indexOf("XSRF-TOKEN") === -1) {
        return;
      }
      // I don't care about the response
      // but it resets the cookie... so... yeah;
      return axios
        .post("http://localhost:8080/api/logout")
        .catch()
        .finally(() => {
          // clear cookie to prevent future auto login attempts;
          document.cookie =
            "XSRFTOKEN=;path=/;expires=Thu, 01 Jan 1970 00:00:00 UTC; Secure;";
        });
    },
    async tryAutoLogin({ commit }) {
      console.log("trying to log you in sir");
      if (document.cookie.indexOf("XSRF-TOKEN") === -1) {
        //geen cookie aanwezig
        console.log("looks like you don't have a cookie bad boy");
      } else {
        //cookie aanwezig dus we kunnen auto loginnen
        commit("setUser", this.user);
        commit("authenticate", true);
        commit("login", true);
        console.log("ooh yeah thats the stuff im logged in bb");
      }
    },
    async getStuff({ commit }) {
      try {
        const { data } = await axios.get("http://localhost:8080/user");
        console.log(data);
        commit("login", true);
        commit("authenticate", true);
        commit("setUser", "sander.spaas@odisee.be");
      } catch (e) {
        console.log(e);
      }
    },
  },
};
