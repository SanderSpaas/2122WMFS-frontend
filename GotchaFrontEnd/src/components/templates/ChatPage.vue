<style></style>

<template>
  <main>
    <MoleculeHeader />
    <h1>Chat pagina</h1>
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
  ...mapGetters({
    authenticated: "auth/isAuthenticated",
    user: "auth/user",
  }),
};
</script>
