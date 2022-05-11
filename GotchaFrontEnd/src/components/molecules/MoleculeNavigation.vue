<style scoped>
button {
  border: none;
  border-radius: 5px 5px 0px 0px;
  transition: 0.5s;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.4)) top/100% 800%;
}
button:hover {
  background-position: bottom;
}
</style>
<template>
  <div class="">
    <router-link to="/stats">
      <AtomButton class="yellow"
        ><Icon
          icon="cil:graph"
          color="#f2f2f2"
          height="6vh"
          :inline="true" /></AtomButton
    ></router-link>
    <router-link to="/game">
      <AtomButton class="lightblue"
        ><Icon
          icon="carbon:game-console"
          color="#f2f2f2"
          height="6vh"
          :inline="true" /></AtomButton
    ></router-link>
    <router-link to="/chat">
      <AtomButton class="green"
        ><Icon
          icon="bx:message-rounded-detail"
          color="#f2f2f2"
          height="6vh"
          :inline="true" /></AtomButton
    ></router-link>
    <router-link to="/history"
      ><AtomButton class="pink"
        ><Icon
          icon="ant-design:history-outlined"
          color="#f2f2f2"
          height="6vh"
          :inline="true" /></AtomButton
    ></router-link>
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
