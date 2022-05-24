<template>
  <div>
    <MoleculeHeader titel="gameslijst" />
    <ul v-for="game in data" :key="game.id">
      <li>
        <p class="name">{{ game.name }}</p>
        <p>{{ game.players.length }}👤</p>

        <router-link
          v-if="joinOrContinue(game.players, user)"
          :to="{ name: 'game', params: { gameId: game.id } }"
          >Continue playing</router-link
        >

        <router-link
          v-else-if="game.status !== 'Active'"
          :to="{ name: 'player', params: { gameId: game.id } }"
          >Join</router-link
        >
        <p v-else>Game in progress</p>

        <p v-if="game.status === 'Active'">
          <Icon
            icon="ant-design:info-circle-twotone"
            color="#4ECB71"
            height="3vh"
            :inline="true"
          />
        </p>
        <p v-else>
          <Icon
            icon="ant-design:info-circle-twotone"
            color="#f24e1e"
            height="3vh"
            :inline="true"
          />
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
import MoleculeHeader from "../molecules/MoleculeHeader.vue";
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import { Icon } from "@iconify/vue";
export default {
  components: {
    Icon,
    MoleculeHeader,
  },
  computed: {
    ...mapGetters({
      data: "games/getGames",
      user: "auth/user",
    }),
  },
  methods: {
    ...mapActions({
      Games: "games/Games",
    }),
    joinOrContinue(players, user) {
      return !!players?.find((p) => p.user_id === user.id);
    },
  },
  created() {
    console.log(this.$store._actions);
  },
  mounted() {
    this.Games();
  },
};
</script>

<style scoped lang="scss">
@import "../../assets/common.css";
.name {
  width: 30vw;
  overflow: hidden;
  text-overflow: ellipsis;
}
.list {
  left: 12.5vw;
  width: 75vw;
  /* display: flex;
  flex-direction: column;
  justify-content: space-evenly; */
}
li {
  display: flex;
  background-color: rgb(249, 249, 249);
  border-radius: 5px 5px 5px 5px;
  padding: 1em;
  margin: 1em;
  color: rgb(0, 0, 0);
  * {
    font-size: 20px;
    width: 30vw;
    height: 4vh;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: center;
  }
  .name {
    text-align: left;
  }
}
</style>
