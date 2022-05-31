<template>
  <div>
    <MoleculeHeader titel="Player view" />
    <PlayerList :gameData="gameData" />
    <MoleculeNavigation />
  </div>
</template>

<script>
import MoleculeHeader from "../molecules/MoleculeHeader.vue";
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import PlayerList from "../organisms/PlayerList.vue";
import MoleculeNavigation from "../molecules/MoleculeNavigation.vue";

export default {
  components: { MoleculeHeader, PlayerList, MoleculeNavigation },
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
  async mounted() {
    await this.Game(this.$route.params.gameId);
  },
};
</script>
<style lang="scss" scoped>
@import "../../assets/common.scss";
</style>
