import { createRouter, createWebHistory } from "vue-router";
import store from "../store";
// import Home from "../components/templates/HomeView.vue";
import Login from "../components/templates/LoginView.vue";
import Register from "../components/templates/RegisterView.vue";
import Player from "../components/templates/PlayerLoginView.vue";
import Stats from "../components/templates/StatsView.vue";
import HistoryDetail from "../components/templates/HistoryDetail.vue";
import Game from "../components/templates/GameView.vue";
import Chat from "../components/templates/ChatView.vue";
import History from "../components/templates/HistoryView.vue";
import Gamelist from "../components/templates/GamesView.vue";
import PlayerView from "../components/templates/PlayerView.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // reduce bundle size with lazy loaded routes!
    //paginas alleen lazy loaden als ze weinig gebruikt worden
    {
      path: "/",
      name: "loginRoot",
      component: Login,
      meta: {
        title: "Login page",
      },
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        title: "Login",
      },
    },
    {
      path: "/register",
      name: "register",
      component: Register,
      meta: {
        title: "Register",
      },
    },
    {
      path: "/game/:gameId/player",
      name: "player",
      component: Player,
      meta: {
        title: "Add player",
      },
    },
    {
      path: "/game/:gameId/stats",
      name: "stats",
      component: Stats,
      meta: {
        title: "Statistics",
      },
    },
    {
      path: "/game/:gameId/game",
      name: "game",
      component: Game,
      meta: {
        title: "Game view",
      },
    },
    {
      path: "/game/:gameId/chat",
      name: "chat",
      component: Chat,
      meta: {
        title: "Chat",
      },
    },
    {
      path: "/game/:gameId/players",
      name: "players",
      component: PlayerView,
      meta: {
        title: "Player view",
      },
    },
    {
      path: "/game/history",
      name: "history",
      component: History,
      meta: {
        title: "History",
      },
    },
    {
      path: "/game/history/:gameId",
      name: "historyDetail",
      component: HistoryDetail,
      meta: {
        title: "History Detail",
      },
    },
    {
      path: "/gamelist",
      name: "gamelist",
      component: Gamelist,
      meta: {
        title: "Game list",
      },
    },
    // alle urls die em niet kent naar de homepage sturen
    // {
    //   path: "/:catchAll(.*)",
    //   redirect: { path: "/" },
    // },
  ],
});
//navigation guards gaan toevoegen
router.beforeEach((to, from, next) => {
  if (to.fullPath !== "/login" && to.fullPath !== "/register") {
    if (!store.getters["auth/isAuthenticated"]) {
      next("/login");
    } else {
      next();
    }
  }
  if (to.fullPath === "/login" || to.fullPath === "/register") {
    if (store.getters["auth/isAuthenticated"]) {
      next("/gamelist");
    } else {
      next();
    }
  }
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
    // I don't trust the other frontender in my team... Which is also me...
    h1.tabIndex = -1;
    h1.focus();
  });
});
export default router;
