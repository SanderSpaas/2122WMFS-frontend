<style></style>

<template>
  <div>
    <MoleculeHeader titel="Stats pagina" />
    <!-- <Barchart chartData="gameData" /> -->
    {{ gameData }}
    <MoleculeNavigation />
  </div>
</template>

<script>
import MoleculeNavigation from "../molecules/MoleculeNavigation.vue";
import MoleculeHeader from "../molecules/MoleculeHeader.vue";
import { Bar } from "vue-chartjs";
import Barchart from "./Barchart.vue";
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import store from "../../store";

export default {
  components: { MoleculeNavigation, MoleculeHeader, Barchart },
  computed: {
    ...mapGetters({
      gameData: "games/getGame",
    }),
  },

  methods: {
    ...mapActions("games", {
      Game: "Game",
    }),
  },
  created() {
    console.log(this.$store._actions);
  },
  mounted() {
    // this.UserFromGame(this.$route.params.gameId);
    this.Game(this.$route.params.gameId);
  },
};
</script>
