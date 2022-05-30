<template>
  <ul class="error" v-if="errors">
    {{
      errors.message
    }}
    <li v-for="(value, key) in errors.errors" :key="key">{{ value[0] }}</li>
  </ul>
</template>
<script>
export default {
  props: ["errors"],
};
</script>
<style lang="scss" scoped>
@import "../../assets/common.scss";
.error {
  background-color: $color-red;
  border-radius: 5px 5px 5px 5px;
  padding: 1em;
  li {
    list-style: none;
  }
  width: 60vw;
}
</style>
