<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 10vh;
}
</style>
<template>
  <header>
    <router-link :to="{ name: 'gamelist' }">
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
  props: ["titel"],
  name: "MoleculeNavigation",
  components: {
    AtomButton,
    Icon,
  },
  methods: {
    logout() {
      console.log(this.$store._actions);
      store.dispatch("auth/logout");
    },
  },
};
</script>
