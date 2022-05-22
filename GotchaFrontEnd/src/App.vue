<script>
import store from "./store";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      data: null,
    };
  },
  components: {},
  methods: {
    logout() {
      console.log("logging you out bye bye sir");
      store.dispatch("auth/logout");
    },
  },
  computed: {
    ...mapGetters({
      loading: "auth/isLoading",
      Loading: "games/isLoading",
    }),
  },
};
</script>

<template>
  <main id="main-content">
    <!-- <h2>GOTCHA</h2> -->
    <a href="#main-content" class="skiplink"> Skip to main content </a>
    <div class="lds-ellipsis" v-if="loading || Loading">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
    <div>
      <!-- route outlet -->
      <!-- component matched by the route will render here -->
      <!-- <router-link to="/gamelist">gamelist</router-link> -->
      <!-- <router-link
        :to="{ name: 'chat', params: { gameId: this.$route.params.gameId } }"
        >chat</router-link
      > -->
      <router-view />
    </div>
  </main>
</template>

<style lang="scss">
@import "./assets/base.css";
@import "./assets/common.css";
a.skiplink {
  position: absolute;
  // background-color: palevioletred;
  top: -100%;
  left: 0;

  &:focus {
    top: 0;
  }
}
h2 {
  font-family: HACKED;
}
</style>
