import { createApp } from "vue";
import App from "./App.vue";
import axios from "axios";
import store from "./store";
import router from "./router";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_API_BASE;

store.dispatch("auth/tryAutoLogin");
const myApp = createApp(App);

myApp.config.globalProperties.$filters = {
  date(value) {
    const date = new Date(value);
    return date.toLocaleDateString(["du-BE"], {
      month: "short",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  },
};
myApp.use(store).use(router).mount("#app");
