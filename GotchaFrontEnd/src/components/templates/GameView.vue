<style></style>

<template>
  <div>
    <MoleculeHeader />
    <h1>Game pagina</h1>
    <div v-if="data">
      <p>{{ data }}</p>
      <p>{{ data.user.name }} aka {{ data.alias }}</p>
      <!-- <img src="../../assets/img/avatar.png" alt="default person avatar" /> -->
      <p>TARGET ID {{ data.target_id }}</p>
      //moet nog target name worden
      <p>{{ data.game.murder_method }}</p>

      <AtomButton @click="killPlayer">I Died</AtomButton>
    </div>
    <MoleculeNavigation />
  </div>
</template>

<script>
import MoleculeNavigation from "../molecules/MoleculeNavigation.vue";
import MoleculeHeader from "../molecules/MoleculeHeader.vue";
import AtomButton from "../atoms/AtomButton.vue";
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
export default {
  components: { MoleculeNavigation, MoleculeHeader, AtomButton },
  computed: {
    ...mapGetters({
      loggedIn: "auth/isLoggedin",
      authenticated: "auth/isAuthenticated",
      user: "auth/user",
      role: "auth/role",
      data: "games/getUserFromGame",
    }),
  },
  methods: {
    ...mapActions({
      UserFromGame: "games/UserFromGame",
      start: "games/start",
      killPlayer: "games/killPlayer",
    }),
  },
  created() {
    console.log(this.$store._actions);
  },
  mounted() {
    this.UserFromGame();
    this.start();
  },
};
</script>
