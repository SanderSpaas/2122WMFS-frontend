<template>
  <div>
    <MoleculeHeader titel="Game view" />
    <div class="container" v-if="player">
      <h2>{{ player.game.name }}</h2>
      <img
        class="responsive"
        src="../../assets/img/Gotcha.gif"
        alt="logo van Gotcha"
      />
      <p v-if="targetData">
        {{ targetData.user.name }} alias: {{ targetData.alias }}
      </p>
      <p v-else-if="player.dead">
        You are dead, suck less next time.<br />
        ¯\_(ツ)_/¯<br />Your killer: {{ killerData.user.name }} alias:
        {{ killerData.alias }}
      </p>
      <p v-else>The game hasn't started yet. <br />(⌐■_■)</p>
      <div class="items">
        <p v-if="targetData" class="left">Murder method:</p>
        <p v-if="targetData" class="infoBox">{{ player.game.murder_method }}</p>
        <AtomButton
          v-if="!player.dead && targetData"
          @click="killPlayer"
          class="info"
          >I Died</AtomButton
        >
        <AtomButton v-else-if="player.dead" disabled="true" class="info"
          >You are dead</AtomButton
        >
        <AtomButton
          v-if="player.user.role === 'admin'"
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
      player: "games/getUserFromGame",
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
<style scoped lang="scss">
@import "../../assets/common.scss";
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
  background-color: $color-gray;
  width: 50vw;
  height: 5vh;
}
button {
  width: 50vw;
  height: 5vh;
  font-size: 17px;
}
// img {
//   /* width: 100%; */
//   height: auto;
//   width: 50vw;
// }
@media only screen and (min-width: 768px) {
  img {
    width: 20vw;
  }
  button {
    width: 20vw;
  }
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
