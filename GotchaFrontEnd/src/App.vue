<script>
import store from "./store";
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
};
</script>

<template>
  <main>
    <!-- <LoginForm /> -->
    <div>
      <h1>Hello App! ik sta in app.vue</h1>
      <!-- route outlet -->
      <!-- component matched by the route will render here -->
      <router-view />
    </div>
  </main>
</template>

<style>
@import "./assets/base.css";
@import "./assets/common.css";
</style>
