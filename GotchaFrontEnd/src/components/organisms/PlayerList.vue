<template>
  <div v-if="gameData">
    <ul>
      <li v-for="player in gameData.players" :key="player.id">
        <p class="name">{{ player.user.name }} aka {{ player.alias }}</p>
        <p v-if="player.dead">
          <AtomButton class="red">Dead</AtomButton>
        </p>
        <p v-else>
          <AtomButton
            v-if="!player.dead"
            @click="killPlayer(gameData.id, player.id)"
            class="red"
            >Kill</AtomButton
          >
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
import store from "../../store";
import AtomButton from "../atoms/AtomButton.vue";
import { mapActions } from "vuex";
export default {
  components: { AtomButton },
  props: ["gameData"],
  created() {
    console.log(this.$store._actions);
  },
  methods: {
    ...mapActions("games", {
      Game: "Game",
    }),
    async killPlayer(gameId, targetID) {
      await store
        .dispatch("games/killPlayer", {
          gameId: gameId,
          targetID: targetID,
        })
        .then(() => {
          this.Game(this.$route.params.gameId);
        });
    },
  },
};
</script>
<style lang="scss" scoped>
div {
  margin-bottom: 10vh;
}
ul {
  overflow-x: hidden;
  overflow-y: auto;
  height: 80vh;
}
li {
  display: flex;
  border-bottom: 1px solid;
  justify-content: space-around;
  height: 5em;
  p {
    text-align: center;
    width: 60vw;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  button {
    // padding: 0.5em;
    height: 4em;
    color: var(--color-text);
    border-radius: 5px 5px 5px 5px;
    transition: 0.5s;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
      rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
      rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
  }
}
button {
  margin: 0.5em;
}
</style>
