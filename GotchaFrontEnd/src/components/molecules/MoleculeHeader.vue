<style lang="scss" scoped>
@import "../../assets/common.scss";
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 10vh;
  h1 {
    color: white;
    font-size: 2.2em;
    font-family: HACKED;
  }
}
</style>
<template>
  <header>
    <router-link v-if="history" :to="{ name: 'history' }"
      ><AtomButton class="clear"
        ><Icon
          icon="ant-design:history-outlined"
          color="#f2f2f2"
          height="6vh"
          :inline="true" /></AtomButton
    ></router-link>
    <router-link v-else :to="{ name: 'gamelist' }">
      <AtomButton class="clear"
        ><Icon
          icon="codicon:list-ordered"
          color="#f2f2f2"
          height="6vh"
          :inline="true" /></AtomButton
    ></router-link>
    <h1>{{ titel }}</h1>
    <AtomButton class="clear"
      ><Icon
        icon="carbon:logout"
        color="#f2f2f2"
        height="6vh"
        :inline="true"
        @click="logout"
    /></AtomButton>
  </header>
</template>

<script>
import AtomButton from "../atoms/AtomButton.vue";
import { Icon } from "@iconify/vue";
import store from "../../store";
export default {
  props: ["titel", "history"],
  name: "MoleculeNavigation",
  components: {
    AtomButton,
    Icon,
  },
  methods: {
    logout() {
      store.dispatch("auth/logout");
    },
  },
};
</script>
