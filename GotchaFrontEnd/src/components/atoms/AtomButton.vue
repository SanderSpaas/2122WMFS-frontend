<!-- <style scoped></style>-->

<style scoped>
button {
  width: 25vw;
  height: 10vh;
}
</style>
<script>
export default {
  props: ["type", "id"],
};
</script>
<template>
  <button class="" :type="type" :id="id">
    <slot></slot>
  </button>
</template>
