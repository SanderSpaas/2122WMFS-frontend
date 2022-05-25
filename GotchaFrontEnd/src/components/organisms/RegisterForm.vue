<template>
  <form @submit.prevent="submit" novalidate>
    <!-- <h2>Login</h2> -->
    <p v-if="error">Error: {{ error + "" }}</p>
    <p class="name">
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
import { mapGetters } from "vuex";
import store from "../../store";

// import { mapActions } from "vuex";
export default {
  data() {
    return {
      name: null,
      password: null,
      email: null,
      submitted: false,
    };
  },
  components: { FormField },
  computed: {
    nameError() {
      if (this.submitted === false) {
        return null;
      }
      if (this.name === null) {
        return "Name is een verplicht veld en werd niet ingevuld.";
      } else {
        return null;
      }
    },
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
      error: "auth/registerError",
    }),
    props: ["password", "email", "name"],
  },
  methods: {
    submit() {
      this.submitted = true;
      if (
        this.nameError === null &&
        this.passwordError === null &&
        this.emailError === null
      ) {
        console.log("I have submitted");
        store.dispatch("auth/register", {
          name: this.name,
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
<style scoped lang="scss">
@import "../../assets/common.scss";
h2 {
  font-size: 2.5em;
}
form {
  display: flex;
  align-items: center;
  flex-direction: column;
}
button {
  background-color: $color-orange;
  color: white;
  padding: 1em;
  width: 50vw;
  margin-top: 1em;
}
.name {
  overflow: hidden;
  text-overflow: ellipsis;
}
a {
  color: $color-orange;
}
p {
  text-align: center;
  width: 60vw;
}
</style>
