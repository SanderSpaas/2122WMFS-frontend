<template>
  <div>
    <MoleculeHeader titel="Add a player" />
    <div class="container">
      <img
        class="responsive"
        src="../../assets/img/Gotcha.gif"
        alt="logo van Gotcha"
      />
      <PlayerLoginForm />
    </div>
  </div>
</template>
<script>
import PlayerLoginForm from "../organisms/PlayerLoginForm.vue";
import MoleculeHeader from "../molecules/MoleculeHeader.vue";
export default {
  components: { PlayerLoginForm, MoleculeHeader },
  methods: {},
};
</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 90vh;
}
img {
  width: 75vw;
}
@media only screen and (min-width: 768px) {
  img {
    width: 20em !important;
  }
}
</style>
