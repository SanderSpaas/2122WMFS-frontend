<style></style>

<template>
  <main>
    <MoleculeHeader />
    <h1>Home pagina</h1>
    <MoleculeNavigation />
  </main>
</template>

<script>
import MoleculeNavigation from "../molecules/MoleculeNavigation.vue";
import MoleculeHeader from "../molecules/MoleculeHeader.vue";

export default {
  components: { MoleculeNavigation, MoleculeHeader },
};
</script>
