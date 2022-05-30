<template>
  <form @submit.prevent="submit" novalidate>
    <validation-errors :errors="errors" v-if="errors"></validation-errors>
    <FormField
      id="email"
      v-model="email"
      type="email"
      :required="true"
      label="E-mail"
      :error="emailError"
    ></FormField>

    <FormField
      id="password"
      v-model="password"
      type="password"
      :required="true"
      label="Wachtwoord"
      :error="passwordError"
    ></FormField>
    <button type="submit">Login</button>
    <p>
      Nog geen account? Registreer dan
      <router-link :to="{ name: 'register' }"> hier</router-link>.
    </p>
  </form>
</template>

<script>
import FormField from "../molecules/FormField.vue";
import store from "../../store";
import ValidationErrors from "../molecules/ValidationErrors.vue";

// import { mapActions } from "vuex";
export default {
  data() {
    return {
      password: null,
      email: null,
      submitted: false,
      errors: null,
    };
  },
  components: { FormField, ValidationErrors },
  computed: {
    emailError() {
      if (this.submitted === false) {
        return null;
      }
      if (this.email === null || this.email === "") {
        return "Email is een verplicht veld.";
      } else {
        return null;
      }
    },
    passwordError() {
      if (this.submitted === false) {
        return null;
      }
      if (this.password === null || this.password === "") {
        return "Wachtwoord is een verplicht veld.";
      } else {
        return null;
      }
    },
    props: ["password", "email"],
  },
  methods: {
    async submit() {
      this.submitted = true;
      if (this.passwordError === null && this.emailError === null) {
        try {
          this.errors = await store.dispatch("auth/login", {
            email: this.email,
            password: this.password,
          });
        } catch (e) {
          console.log(e.response.data.message);
        }
      } else {
        console.log("you aint getting in you scoundrel");
      }
    },
  },
};
</script>
<style scoped lang="scss">
@import "../../assets/common.scss";
@import "../../assets/login.scss";
</style>
