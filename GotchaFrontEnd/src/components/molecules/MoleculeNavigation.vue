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
    <!-- <router-link
      :to="{ name: 'history', params: { gameId: this.$route.params.gameId } }"
      ><AtomButton class="pink"
        ><Icon
          icon="ant-design:history-outlined"
          color="#f2f2f2"
          height="6vh"
          :inline="true" /></AtomButton
    ></router-link> -->
  </div>
</template>
<script>
import AtomButton from "../atoms/AtomButton.vue";
import { Icon } from "@iconify/vue";
export default {
  name: "MoleculeNavigation",
  components: {
    AtomButton,
    Icon,
  },
};
</script>
<style scoped lang="scss">
@import "../../assets/common.scss";
button {
  border-radius: 5px 5px 0px 0px;
  transition: 0.5s;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.4)) top/100% 800%;
  width: 33.33vw !important;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
    rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
}
button:hover {
  background-position: bottom;
}
.bottemNav {
  position: fixed;
  bottom: 0;
  width: 100%;
  // box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
  //   rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
  //   rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
}
</style>
