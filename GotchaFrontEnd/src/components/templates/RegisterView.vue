<template>
  <main>
    <div>
      <img
        class="responsive"
        src="../../assets/img/Gotcha.gif"
        alt="logo van Gotcha"
      />
     
      <RegisterForm />
    </div>
  </main>
</template>
<script>
import RegisterForm from "../organisms/RegisterForm.vue";
export default {
  // data() {
  //   return {
  //     data: null,
  //   };
  // },
  components: { RegisterForm },
  methods: {},
};
</script>

<style scoped lang="scss">
img {
  padding-left: 4em;
  padding-right: 4em;
}
</style>
