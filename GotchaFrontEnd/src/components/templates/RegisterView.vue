<template>
  <div class="container">
    <img
      class="responsive"
      src="../../assets/img/Gotcha.gif"
      alt="logo van Gotcha"
    />

    <RegisterForm />
  </div>
</template>
<script>
import RegisterForm from "../organisms/RegisterForm.vue";
export default {
  components: { RegisterForm },
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
