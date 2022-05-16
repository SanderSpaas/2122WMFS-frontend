<template>
  <main>
    <p>Error: {{ error + "" }}</p>
    <form @submit.prevent="tryLogin" novalidate>
      <h2>Aanmelden</h2>
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
      <button type="submit" @click="submit()">Aanmelden</button>
    </form>
  </main>
</template>

<script>
import FormField from "../molecules/FormField.vue";
import { mapGetters } from "vuex";
import store from "../../store";
// import { mapActions } from "vuex";
export default {
  data() {
    return {
      password: null,
      email: null,
      submitted: false,
    };
  },
  components: { FormField },
  computed: {
    emailError() {
      if (this.submitted === false) {
        return null;
      }
      if (this.email === null) {
        return "Email is een verplicht veld en werd niet ingevuld.";
      } else {
        return null;
      }
    },
    passwordError() {
      if (this.submitted === false) {
        return null;
      }
      if (this.password === null) {
        return "Wachtwoord is een verplicht veld en werd niet ingevuld.";
      } else {
        return null;
      }
    },
    ...mapGetters({
      error: "auth/error",
    }),
    props: ["password", "email"],
  },
  methods: {
    submit() {
      this.submitted = true;
      if (this.passwordError === null && this.emailError === null) {
        console.log("I have submitted");
        store.dispatch("auth/login", {
          email: this.email,
          password: this.password,
        });
      } else {
        console.log("you aint getting in you scoundrel");
      }
    },
  },
};
</script>
<style></style>
