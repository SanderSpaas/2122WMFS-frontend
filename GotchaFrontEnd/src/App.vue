<script>
import store from "./store";
import { mapGetters } from "vuex";

export default {
  methods: {
    logout() {
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
    <a href="#main-content" class="skiplink"> Skip to main content </a>
    <div class="lds-ellipsis" v-if="loading || Loading">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
    <div>
      <router-view />
    </div>
  </main>
</template>

<style lang="scss">
@import "./assets/base.css";
@import "./assets/common.scss";
a.skiplink {
  position: absolute;
  top: -100%;
  left: 0;

  &:focus {
    top: 0;
  }
}
</style>
