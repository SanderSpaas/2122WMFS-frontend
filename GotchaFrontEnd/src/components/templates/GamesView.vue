<template>
  <div>
    <h1>ik ben de gameslijstheader :)</h1>
    <div class="list" v-for="game in data" :key="game.id">
      <div class="gameBlok">
        <p>{{ game.name }}</p>
        <p>0👤</p>

        <router-link to="/game">Join</router-link>
        <!-- todo add tooltip -->
        <!-- <div class="tooltip"> -->
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
        <!-- <span class="tooltiptext">{{ game.status }}</span> -->
        <!-- </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import { Icon } from "@iconify/vue";
export default {
  components: {
    Icon,
  },
  computed: {
    ...mapGetters({
      data: "games/getGames",
    }),
  },
  methods: {
    ...mapActions({
      Games: "games/Games",
    }),
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
.list {
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
