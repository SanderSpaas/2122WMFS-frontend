<template>
  <div>
    <MoleculeHeader titel="Games history" />
    <GamesList :data="data" :history="true" />
  </div>
</template>

<script>
import MoleculeHeader from "../molecules/MoleculeHeader.vue";
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import GamesList from "../organisms/GamesList.vue";
export default {
  components: {
    GamesList,
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
@import "../../assets/common.scss";
MoleculeNavigation {
  margin-bottom: 10vh;
}
</style>
