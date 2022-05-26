<template>
  <div>
    <MoleculeHeader titel="Add a player" />
    <img
      class="responsive"
      src="../../assets/img/Gotcha.gif"
      alt="logo van Gotcha"
    />
    <PlayerLoginForm />
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

<style>
img {
  padding-left: 4em;
  padding-right: 4em;
}
</style>
