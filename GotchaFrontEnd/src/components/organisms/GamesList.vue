<template>
  <ul>
    <span v-for="game in data" :key="game.id">
      <li v-if="game.status !== 'Finished' && !history">
        <p class="people">{{ game.players.length }}👤</p>
        <p class="name">{{ game.name }}</p>
        <router-link
          v-if="history"
          class="green"
          :to="{ name: 'historyDetail', params: { gameId: game.id } }"
        >
          See info</router-link
        >
        <router-link
          v-if="joinOrContinue(game.players, user) && !history"
          class="green"
          :to="{ name: 'game', params: { gameId: game.id } }"
          >Resume</router-link
        >
        <router-link
          v-else-if="game.status === 'Open' && !history"
          class="lightblue"
          :to="{ name: 'player', params: { gameId: game.id } }"
          >Join</router-link
        >
        <p v-else-if="!history" class="pink closed">Closed</p>
      </li>
      <li v-if="game.status === 'Finished' && history">
        <p class="people">{{ game.players.length }}👤</p>
        <p class="name">{{ game.name }}</p>
        <router-link
          v-if="history"
          class="green"
          :to="{ name: 'historyDetail', params: { gameId: game.id } }"
        >
          See info</router-link
        >
      </li>
    </span>
  </ul>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: ["data", "history"],
  computed: {
    ...mapGetters({
      user: "auth/user",
    }),
  },
  methods: {
    joinOrContinue(players, user) {
      return !!players?.find((p) => p.user_id === user.id);
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../assets/common.scss";
ul {
  padding: 1em;
  overflow-x: hidden;
  overflow-y: auto;
  height: 90vh;
}
li {
  display: flex;
  background-color: rgb(249, 249, 249);
  border-radius: 5px 5px 5px 5px;
  padding: 1em;
  margin: 1em;
  color: rgb(0, 0, 0);
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  * {
    font-size: 20px;
    width: 30vw;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: center;
  }
  .name {
    width: 35vw;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .people {
    width: 15vw;
  }
  a {
    border-radius: 5px 5px 5px 5px;
    color: white;
    text-decoration: none;
  }
  .closed {
    border-radius: 5px 5px 5px 5px;
    color: white;
  }
}
</style>
