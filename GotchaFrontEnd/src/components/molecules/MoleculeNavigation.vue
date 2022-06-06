<template>
  <div class="bottemNav">
    <router-link
      :to="{ name: 'stats', params: { gameId: this.$route.params.gameId } }"
    >
      <AtomButton class="orange"
        ><Icon
          icon="cil:graph"
          color="#f2f2f2"
          height="6vh"
          :inline="true" /></AtomButton
    ></router-link>
    <router-link
      :to="{ name: 'game', params: { gameId: this.$route.params.gameId } }"
    >
      <AtomButton class="red"
        ><Icon
          icon="carbon:game-console"
          color="#f2f2f2"
          height="6vh"
          :inline="true" /></AtomButton
    ></router-link>
    <router-link
      :to="{ name: 'chat', params: { gameId: this.$route.params.gameId } }"
    >
      <AtomButton class="purple"
        ><Icon
          icon="bx:message-rounded-detail"
          color="#f2f2f2"
          height="6vh"
          :inline="true" /></AtomButton
    ></router-link>
    <router-link
      v-if="user.role === 'spelbegeleider' || user.role === 'admin'"
      :to="{ name: 'players' }"
    >
      <AtomButton class="pink"
        ><Icon
          icon="akar-icons:person"
          color="#f2f2f2"
          height="6vh"
          :inline="true" /></AtomButton
    ></router-link>
  </div>
</template>
<script>
import AtomButton from "../atoms/AtomButton.vue";
import { Icon } from "@iconify/vue";
import { mapGetters } from "vuex";
export default {
  name: "MoleculeNavigation",
  components: {
    AtomButton,
    Icon,
  },
  computed: {
    ...mapGetters({
      user: "auth/user",
    }),
  },
};
</script>
<style scoped lang="scss">
@import "../../assets/common.scss";
button {
  border-radius: 5px 5px 0px 0px;
  transition: 0.5s;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.4)) top/100% 800%;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
    rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
  width: 100%;
}
button:hover {
  background-position: bottom;
}
a {
  width: 100%;
}
.bottemNav {
  position: fixed;
  display: flex;
  bottom: 0;
  width: 100%;
}
.router-link-active {
  button {
    border-bottom: 5px solid rgba(32, 32, 35, 0.751);
  }
}
</style>
