<template>
  <div class="bottemNav">
    <router-link
      :to="{ name: 'stats', params: { gameId: this.$route.params.gameId } }"
    >
      <AtomButton class="yellow"
        ><Icon
          icon="cil:graph"
          color="#f2f2f2"
          height="6vh"
          :inline="true" /></AtomButton
    ></router-link>
    <router-link
      :to="{ name: 'game', params: { gameId: this.$route.params.gameId } }"
    >
      <AtomButton class="lightblue"
        ><Icon
          icon="carbon:game-console"
          color="#f2f2f2"
          height="6vh"
          :inline="true" /></AtomButton
    ></router-link>
    <router-link
      :to="{ name: 'chat', params: { gameId: this.$route.params.gameId } }"
    >
      <AtomButton class="green"
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
<style scoped>
@import "../../assets/common.css";
button {
  border-radius: 5px 5px 0px 0px;
  transition: 0.5s;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.4)) top/100% 800%;
  width: 33.33vw;
}
button:hover {
  background-position: bottom;
}
.bottemNav {
  position: fixed;
  bottom: 0;
  width: 100%;
}
</style>
