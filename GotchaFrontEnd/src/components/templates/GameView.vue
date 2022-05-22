<style scoped>
* {
  color: white;
}
.info {
  background-color: #da2f2f;
}
p {
  text-align: center;
  font-size: 17px;
}
.infoBox {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px 5px 5px 5px;
  background-color: rgb(47, 206, 216);
  width: 50vw;
  height: 5vh;
}
button {
  width: 50vw;
  height: 5vh;
  font-size: 17px;
}
img {
  width: 100%;
  height: auto;
  padding-left: 6.5em;
  padding-right: 6.5em;
}
.container {
  display: flex;
  flex-direction: column;
  /* background-color: rgb(42, 23, 191); */
  align-items: center;
  justify-content: space-evenly;
  height: 70vh;
}
.items {
  display: flex;
  flex-direction: column;
  /* background-color: purple; */
  align-items: center;
  justify-content: space-evenly;
  height: 20vh;
}
.left {
  align-self: flex-start;
}
</style>

<template>
  <div>
    <MoleculeHeader titel="Game pagina" />
    <div class="container" v-if="data">
      <!-- <p>{{ data }}</p>
      <p>{{ targetData }}</p> -->
      <h2>{{ data.game.name }}</h2>
      <!-- <p>THIS IS YOU {{ data.user.name }} aka {{ data.alias }}</p> -->
      <img src="../../assets/img/avatar.png" alt="default person avatar" />
      <p v-if="targetData">
        {{ targetData.user.name }} alias: {{ targetData.alias }}
      </p>
      <p v-else-if="data.dead">
        You are dead, suck less next time.<br />
        ¯\_(ツ)_/¯<br />Your killer: {{ killerData.user.name }} alias:
        {{ killerData.alias }}
      </p>
      <p v-else>The game hasn't started yet.<br /></p>
      <div class="items">
        <p class="left">Murder method:</p>
        <p class="infoBox">{{ data.game.murder_method }}</p>
        <AtomButton v-if="!data.dead" @click="killPlayer" class="info"
          >I Died</AtomButton
        >
        <AtomButton v-else-if="data.dead" disabled="true" class="info"
          >You are dead</AtomButton
        >
        <AtomButton
          v-if="data.user.role === 'admin'"
          @click="start"
          class="info"
          >Assign targets</AtomButton
        >
      </div>
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
      targetData: "games/getTarget",
      killerData: "games/getKiller",
    }),
  },
  methods: {
    ...mapActions({
      UserFromGame: "games/UserFromGame",
      start: "games/start",
      killPlayer: "games/killPlayer",
      Target: "games/Target",
      Killer: "games/Killer",
    }),
  },
  created() {
    console.log(this.$store._actions);
  },
  mounted() {
    this.UserFromGame(this.$route.params.gameId);
    this.Target(this.$route.params.gameId);
    this.Killer(this.$route.params.gameId);
  },
};
</script>
