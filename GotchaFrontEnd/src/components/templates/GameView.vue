<style></style>

<template>
  <div>
    <MoleculeHeader />
    <h1>Game pagina</h1>
    <div v-if="data">
      <p>{{ data }}</p>
      <p>THIS IS YOU {{ data.user.name }} aka {{ data.alias }}</p>
      <!-- <img src="../../assets/img/avatar.png" alt="default person avatar" /> -->
      <p v-if="data.target_id !== null">TARGET ID {{ data.target_id }}</p>
      <p v-else>YOUR TARGET IS BEING HUNTED BY YOUR KILLER</p>
      //moet nog target name worden
      <p>{{ data.game.murder_method }}</p>

      <AtomButton v-if="!data.user.dead" @click="killPlayer">I Died</AtomButton>
      <AtomButton v-else disabled="true">You are dead</AtomButton>
      <AtomButton v-if="data.user.role === 'admin'" @click="start"
        >Assign targets</AtomButton
      >
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
    this.UserFromGame(this.$route.params.gameId);
  },
};
</script>
