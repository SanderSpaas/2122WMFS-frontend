<template>
  <div>
    <MoleculeHeader titel="Game view" />
    <div class="container" v-if="gameData">
      <h2>{{ gameData.name }}</h2>
      <img
        class="responsive"
        src="../../assets/img/Gotcha.gif"
        alt="logo van Gotcha"
      />
      <div v-for="player in gameData.players" :key="player.id">
        <div v-if="user.id === player.user.id && gameData.status === 'Started'">
          <p v-if="player.target_id">
            Target:
            {{ gameData.players[player.target_id].user.name }} alias:
            {{ gameData.players[player.target_id].alias }}
          </p>
          <p v-else>
            You are dead, suck less next time.<br />
            ¯\_(ツ)_/¯<br />Your killer:
            {{ gameData.players[player.killer_id].user.name }} alias:
            {{ gameData.players[player.killer_id].alias }}
          </p>
          <div class="items">
            <p class="left">Murder method</p>
            <p class="infoBox">
              {{ gameData.murder_method }}
            </p>
            <AtomButton
              v-if="!player.dead"
              @click="killPlayer(gameData.id, player.id)"
              class="info"
              >I Died</AtomButton
            >
            <AtomButton v-else disabled="true" class="info"
              >You are dead</AtomButton
            >
          </div>
        </div>
        <p v-else-if="user.id === player.user.id">
          The game hasn't started yet. <br />(⌐■_■)
        </p>
      </div>
    </div>
    <MoleculeNavigation />
  </div>
</template>

<script>
import MoleculeNavigation from "../molecules/MoleculeNavigation.vue";
import MoleculeHeader from "../molecules/MoleculeHeader.vue";
import AtomButton from "../atoms/AtomButton.vue";
import store from "../../store";
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
export default {
  components: { MoleculeNavigation, MoleculeHeader, AtomButton },
  computed: {
    ...mapGetters({
      loggedIn: "auth/isLoggedin",
      authenticated: "auth/isAuthenticated",
      user: "auth/user",
      gameData: "games/getGame",
    }),
  },
  methods: {
    ...mapActions({
      Game: "games/Game",
    }),
    killPlayer(gameId, targetID) {
      store.dispatch("games/killPlayer", {
        gameId: gameId,
        targetID: targetID,
      });
    },
  },
  mounted() {
    this.Game(this.$route.params.gameId);
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

img {
  height: auto;
  width: 50vw !important;
}
@media only screen and (min-width: 768px) {
  img {
    width: 20em !important;
  }
  button {
    width: 20vw;
  }
}
.infoBox {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px 5px 5px 5px;
  background-color: $color-gray;
  width: 50vw;
  min-height: 5vh;
}
button {
  width: 50vw;
  height: 5vh;
  font-size: 17px;
}
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 70vh;
}
.items {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 20vh;
}
</style>
