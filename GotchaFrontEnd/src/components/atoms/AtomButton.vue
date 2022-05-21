<!-- <style scoped></style>-->

<style scoped>
button {
  width: 25vw;
  height: 10vh;
}
.yellow {
  background-color: rgb(238, 188, 123);
}
.lightblue {
  background-color: rgb(47, 208, 218);
}
.green {
  background-color: rgb(58, 183, 85);
}
.pink {
  background-color: rgb(183, 58, 95);
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
