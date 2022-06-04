<template>
  <main>
    <form @submit.prevent="tryLogin" novalidate>
      <validation-errors :errors="errors" v-if="errors"></validation-errors>
      <FormField
        id="alias"
        v-model="alias"
        type="name"
        :required="true"
        label="Alias aka nickname"
        :error="aliasError"
      ></FormField>
      <button type="submit" @click="submit()">Play</button>
    </form>
  </main>
</template>

<script>
import FormField from "../molecules/FormField.vue";
import store from "../../store";
import ValidationErrors from "../molecules/ValidationErrors.vue";
export default {
  data() {
    return {
      alias: null,
      submitted: false,
      errors: null,
    };
  },
  components: { FormField, ValidationErrors },
  computed: {
    aliasError() {
      if (this.submitted === false) {
        return null;
      }
      if (this.alias === null || this.alias === "") {
        return "Alias is een verplicht veld.";
      } else {
        return null;
      }
    },
  },
  methods: {
    async submit() {
      this.submitted = true;
      if (this.aliasError === null) {
        this.errors = await store.dispatch("games/addPlayer", {
          alias: this.alias,
          gameId: this.$route.params.gameId,
        });
      } else {
        console.log("name not filled in");
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../../assets/common.scss";
@import "../../assets/login.scss";
</style>
