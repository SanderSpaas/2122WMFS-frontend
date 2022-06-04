<template>
  <form @submit.prevent="submit" novalidate>
    <validation-errors :errors="errors" v-if="errors"></validation-errors>
    <p v-if="!errors" class="name">
      Welcome target!<br />
      whoops uhhh... I mean: {{ name }}
    </p>
    <FormField
      id="name"
      v-model="name"
      type="name"
      :required="true"
      label="Name"
      :error="nameError"
    ></FormField>
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
    <button type="submit">Register</button>
    <p>
      Heb je al een account? Log dan
      <router-link :to="{ name: 'login' }"> hier</router-link> in.
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
      name: null,
      password: null,
      email: null,
      submitted: false,
      errors: null,
    };
  },
  components: { FormField, ValidationErrors },
  computed: {
    nameError() {
      if (this.submitted === false) {
        return null;
      }
      if (this.name === null) {
        return "Name is een verplicht veld.";
      } else {
        return null;
      }
    },
    emailError() {
      if (this.submitted === false) {
        return null;
      }
      if (this.email === null) {
        return "Email is een verplicht veld.";
      } else {
        return null;
      }
    },
    passwordError() {
      if (this.submitted === false) {
        return null;
      }
      if (this.password === null) {
        return "Wachtwoord is een verplicht veld.";
      } else {
        return null;
      }
    },
  },
  methods: {
    async submit() {
      this.submitted = true;
      if (
        this.nameError === null &&
        this.passwordError === null &&
        this.emailError === null
      ) {
        console.log("I have submitted");
        try {
          this.errors = await store.dispatch("auth/register", {
            name: this.name,
            email: this.email,
            password: this.password,
          });
        } catch (e) {
          console.log(e.response.data.message);
        }
      }
    },
  },
};
</script>
<style scoped lang="scss">
@import "../../assets/common.scss";
@import "../../assets/login.scss";
</style>
