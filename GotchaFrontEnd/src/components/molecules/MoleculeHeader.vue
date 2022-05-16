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
header {
  display: flex;
  justify-content: space-between;
}
</style>
<template>
  <header>
    <router-link :to="{ name: 'gamelist' }">
      <AtomButton class=""
        ><Icon
          icon="codicon:list-ordered"
          color="#f2f2f2"
          height="6vh"
          :inline="true" /></AtomButton
    ></router-link>

    <AtomButton class=""
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
