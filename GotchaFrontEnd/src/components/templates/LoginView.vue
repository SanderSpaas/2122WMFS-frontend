<template>
  <div class="container">
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
  components: { LoginForm },
  methods: {},
};
</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 100vh;
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
