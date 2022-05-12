<template>
  <main>
    <h1>ik ben de gameslijstheader :)</h1>
    <ul v-for="game in games" aria-label="game" :key="game.id">
      <li>{{ game.name }}</li>
    </ul>
  </main>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
export default {
  state() {
    return {
      games: null,
    };
  },
  computed: {
    ...mapGetters({
      games: "games/getData",
    }),
  },
  methods: {
    ...mapGetters({
      getData: "games/getData",
    }),
    ...mapActions({
      getGames: "games/getGames",
    }),
  },
  created() {
    console.log(this.$store._actions);
  },
  mounted() {
    this.getGames();
  },
};
</script>

<style></style>
