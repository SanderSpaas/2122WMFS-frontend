<style></style>

<template>
  <div>
    <MoleculeHeader titel="Games history" />
    <MoleculeNavigation />
  </div>
</template>

<script>
import MoleculeNavigation from "../molecules/MoleculeNavigation.vue";
import MoleculeHeader from "../molecules/MoleculeHeader.vue";

export default {
  components: { MoleculeNavigation, MoleculeHeader },
};
</script>
