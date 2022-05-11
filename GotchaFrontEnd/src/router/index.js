import { createRouter, createWebHistory } from "vue-router";
import store from "../store";
import Home from "../components/templates/HomeView.vue";
import Login from "../components/templates/LoginView.vue";
import Stats from "../components/templates/StatsView.vue";
import Game from "../components/templates/GameView.vue";
import Chat from "../components/templates/ChatPage.vue";
import History from "../components/templates/HistoryView.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // reduce bundle size with lazy loaded routes!
    //paginas alleen lazy loaden als ze weinig gebruikt worden
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/stats",
      name: "stats",
      component: Stats,
    },
    {
      path: "/home",
      name: "home",
      component: Home,
    },
    {
      path: "/game",
      name: "game",
      component: Game,
    },
    {
      path: "/chat",
      name: "chat",
      component: Chat,
    },
    {
      path: "/history",
      name: "history",
      component: History,
    },
    //alle urls die em niet kent naar de homepage sturen
    // {
    //   path: "/:catchAll(.*)",
    //   redirect: { path: "/" },
    // },
    {
      path: "/admin",
      name: "admin",
      component: () => import("../components/templates/AdminView.vue"),
      meta: { requiresAuth: true, role: "admin" },
    },
  ],
});
//navigation guards gaan toevoegen
router.beforeEach((to, from, next) => {
  if (to.fullPath !== "/login") {
    // console.log(store.getters["auth/isAuthenticated"]);
    if (!store.getters["auth/isAuthenticated"]) {
      next("/login");
    }
  }
  if (to.fullPath === "/login") {
    if (store.getters["auth/isAuthenticated"]) {
      next("/home");
    }
  }
  next();
});
export default router;
