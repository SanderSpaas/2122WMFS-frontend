<template>
  <main>
    <p>Error: {{ error + "" }}</p>
    <form @submit.prevent="tryLogin" novalidate>
      <h2>Creëer je alias voor deze game</h2>
      <FormField
        id="alias"
        v-model="alias"
        type="name"
        :required="true"
        label="Alias"
        :error="aliasError"
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
      alias: null,
      submitted: false,
    };
  },
  components: { FormField },
  computed: {
    aliasError() {
      if (this.submitted === false) {
        return null;
      }
      if (this.alias === null) {
        return "Alias is een verplicht veld en werd niet ingevuld.";
      } else {
        return null;
      }
    },
    ...mapGetters({
      error: "auth/error",
    }),
    props: ["alias"],
  },
  methods: {
    submit() {
      this.submitted = true;
      if (this.aliasError === null) {
        console.log("I have submitted");
        try {
          store.dispatch("games/addPlayer", {
            alias: this.alias,
            gameId: this.$route.params.gameId,
          });
          this.$router.push({
            name: "chat",
            params: { gameId: this.$route.params.gameId },
          });
        } catch (e) {
          console.log(e);
        }
      } else {
        console.log("looks like you forgot something huh");
      }
    },
  },
};
</script>
<style></style>
