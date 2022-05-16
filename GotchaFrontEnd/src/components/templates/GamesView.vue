<template>
  <div>
    <MoleculeHeader />
    <h1>ik ben de gameslijstheader :)</h1>
    <div class="list" v-for="game in data" :key="game.id">
      <div class="gameBlok">
        <p class="name">{{ game.name }}</p>
        <p>{{ game.players.length }}👤</p>

        <router-link
          v-if="joinOrContinue(game.players, user)"
          :to="{ name: 'game', params: { gameId: game.id } }"
          >Continue playing</router-link
        >

        <router-link
          v-else
          :to="{ name: 'player', params: { gameId: game.id } }"
          >Join</router-link
        >

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
      </div>
    </div>
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
      return !!players?.find((p) => p.id === user.id);
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

<style scoped>
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
.gameBlok {
  display: flex;
  justify-content: space-evenly;
  background-color: rgb(249, 249, 249);
  border-radius: 5px 5px 5px 5px;
  padding: 1em;
  margin: 1em;
  color: rgb(0, 0, 0);
}
</style>
