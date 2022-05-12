<style></style>

<template>
  <main>
    <MoleculeHeader />
    <h1>Chat pagina</h1>
    <p>Logged in: {{ loggedIn + "" }}</p>
    <p>Authenticated: {{ authenticated + "" }}</p>
    <p>User: {{ user + "" }}</p>
    <p>role: {{ role + "" }}</p>
    <MoleculeNavigation />
  </main>
</template>

<script>
import MoleculeNavigation from "../molecules/MoleculeNavigation.vue";
import MoleculeHeader from "../molecules/MoleculeHeader.vue";
import { mapGetters } from "vuex";

export default {
  components: { MoleculeNavigation, MoleculeHeader },
  computed: {
    ...mapGetters({
      loggedIn: "auth/isLoggedin",
      authenticated: "auth/isAuthenticated",
      user: "auth/user",
    }),
  },

  // props: {
  //   loggedIn: {
  //     type: Boolean, // String / Array / Number / Boolean
  //     default: false,
  //   },
  //   authenticated: {
  //     type: Boolean,
  //     default: false,
  //   },
  //   user: {
  //     type: String,
  //     default: "",
  //   },
  //   role: {
  //     type: String,
  //     default: "",
  //   },
  // },
};
</script>
