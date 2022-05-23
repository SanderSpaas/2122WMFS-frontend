<style></style>

<template>
  <div>
    <MoleculeHeader titel="Stats pagina" />
    <!-- <Barchart chartData="gameData" /> -->
    {{ gameData }}
    {{ getDead }}
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
  // data() {
  //   return {
  //     DeadAlive: store.getters.getDead,
  //   };
  // },
  components: { MoleculeNavigation, MoleculeHeader, Barchart },
  computed: {
    ...mapGetters({
      gameData: "games/getGame",
      getDead: "games/getDead",
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
    this.$store.dispatch("userRequest").then((data) => {
      if (this.$store.getters.getDead(data)) {
        console.log(data);
      }
    });
  },
};
</script>
