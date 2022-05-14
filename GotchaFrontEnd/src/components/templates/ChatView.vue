<style></style>

<template>
  <div>
    <MoleculeHeader />
    <div v-if="data">
      <p>{{ data }}</p>
      <p>{{ data.user.name }} aka {{ data.alias }}</p>
    </div>
    <h1>Chat pagina</h1>
    <div v-if="user">
      <p>Logged in: {{ loggedIn + "" }}</p>
      <p>Authenticated: {{ authenticated + "" }}</p>
      <p>User: {{ user.name + "" }}</p>
      <p>role: {{ user.role + "" }}</p>
    </div>

    <MoleculeNavigation />
  </div>
</template>

<script>
import MoleculeNavigation from "../molecules/MoleculeNavigation.vue";
import MoleculeHeader from "../molecules/MoleculeHeader.vue";
import { mapGetters } from "vuex";
import { mapActions } from "vuex";

export default {
  components: { MoleculeNavigation, MoleculeHeader },
  computed: {
    ...mapGetters({
      loggedIn: "auth/isLoggedin",
      authenticated: "auth/isAuthenticated",
      user: "auth/user",
      data: "games/getUserFromGame",
    }),
  },
  methods: {
    ...mapActions({
      UserFromGame: "games/UserFromGame",
    }),
  },
  created() {
    console.log(this.$store._actions);
  },
  mounted() {
    this.UserFromGame();
  },
};
</script>
