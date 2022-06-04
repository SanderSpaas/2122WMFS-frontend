<template>
  <div>
    <img
      class="responsive"
      src="../../assets/img/Gotcha.gif"
      alt="logo van Gotcha"
    />
    <LoginForm />
  </div>
</template>
<script>
import LoginForm from "../organisms/LoginForm.vue";
export default {
  // data() {
  //   return {
  //     data: null,
  //   };
  // },
  components: { LoginForm },
  methods: {},
};
</script>

<style scoped lang="scss">
img {
  padding-left: 4em;
  padding-right: 4em;
}
</style>
