import { createApp } from "vue";
import App from "./App.vue";
import axios from "axios";
import store from "./store";
import router from "./router";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_API_BASE;

store.dispatch("auth/tryAutoLogin");

createApp(App).use(store).use(router).mount("#app");
