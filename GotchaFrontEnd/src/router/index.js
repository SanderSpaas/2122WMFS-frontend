import { createRouter, createWebHistory } from "vue-router";
import store from "../store";
import Home from "../components/templates/HomeView.vue";
import Login from "../components/templates/LoginView.vue";
import Player from "../components/templates/PlayerLoginView.vue";
import Stats from "../components/templates/StatsView.vue";
import Game from "../components/templates/GameView.vue";
import Chat from "../components/templates/ChatView.vue";
import History from "../components/templates/HistoryView.vue";
import Gamelist from "../components/templates/GamesView.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // reduce bundle size with lazy loaded routes!
    //paginas alleen lazy loaden als ze weinig gebruikt worden
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        title: "Login page",
      },
    },
    {
      path: "/game/:gameId/player",
      name: "player",
      component: Player,
      meta: {
        title: "Add player page",
      },
    },
    {
      path: "/game/:gameId/stats",
      name: "stats",
      component: Stats,
      meta: {
        title: "Statistics page",
      },
    },
    {
      path: "/home",
      name: "home",
      component: Home,
      meta: {
        title: "Home page",
      },
    },
    {
      path: "/game/:gameId/game",
      name: "game",
      component: Game,
      meta: {
        title: "Game page",
      },
    },
    {
      path: "/game/:gameId/chat",
      name: "chat",
      component: Chat,
      meta: {
        title: "Chat page",
      },
    },
    {
      path: "/game/:gameId/history",
      name: "history",
      component: History,
      meta: {
        title: "History page",
      },
    },
    {
      path: "/gamelist",
      name: "gamelist",
      component: Gamelist,
      meta: {
        title: "Game list page",
      },
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
      meta: {
        requiresAuth: true,
        role: "admin",
        title: "Admin page",
      },
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
    // return;
  }
  if (to.fullPath === "/login") {
    if (store.getters["auth/isAuthenticated"]) {
      next("/gamelist");
    }
    // return;
  }
  next();
});

let initial = true;

router.afterEach((to) => {
  //title gaan goedzetten
  document.title = to.meta.title + " Gotcha";

  //adding some accesible routing ✨🌟
  // don't do it the first time
  if (initial) {
    initial = false;
    return;
  }

  // make sure there is a page reflow first
  setTimeout(() => {
    let h1 = document.querySelector("main h1");
    if (!h1) {
      return;
    }

    // make sure the h1 can receive focus
    // I don't trust the other frontender in my team...
    h1.tabIndex = -1;
    h1.focus();
  });
});
export default router;
