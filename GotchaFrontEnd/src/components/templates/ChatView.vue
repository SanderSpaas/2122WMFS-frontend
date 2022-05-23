<style scoped>
/* talk bubble contents */
.talktext {
  padding: 1em;
  text-align: left;
  line-height: 1.5em;
  color: rgb(242, 242, 242);
}
/* Right triangle, right side slightly down*/
.tri-right.border.right-in:before {
  content: " ";
  position: absolute;
  width: 0;
  height: 0;
  left: auto;
  right: -40px;
  top: 30px;
  bottom: auto;
  border: 20px solid;
  border-color: #666 transparent transparent #666;
}
.tri-left.border.left-in:before {
  content: " ";
  position: absolute;
  width: 0;
  height: 0;
  left: -40px;
  right: auto;
  top: 30px;
  bottom: auto;
  border: 20px solid;
  border-color: #666 #666 transparent transparent;
}
.tri-left.left-in:after {
  content: " ";
  position: absolute;
  width: 0;
  height: 0;
  left: -20px;
  top: 15px;
  bottom: auto;
  border: 12px solid;
  border-color: rgb(42, 157, 202) rgb(42, 157, 202) transparent transparent;
}
.tri-right.right-in:after {
  content: " ";
  position: absolute;
  width: 0;
  height: 0;
  right: -20px;
  top: 15px;
  bottom: auto;
  border: 12px solid;
  border-color: rgb(56, 176, 82) transparent transparent rgb(56, 176, 82);
}
/* CSS talk bubble */
.talk-bubble {
  margin: 40px;
  width: 66vw;
  height: auto;
}
.left {
  background-color: rgb(42, 157, 202);
}
.right {
  background-color: rgb(56, 176, 82);
}
.dead {
  background-color: #da2f2f;
}
.deadRight:after {
  border-color: #da2f2f transparent transparent #da2f2f !important;
}
.deadLeft:after {
  border-color: #da2f2f #da2f2f transparent transparent !important;
}
.round {
  border-radius: 30px;
  -webkit-border-radius: 30px;
  -moz-border-radius: 30px;
}
li {
  list-style: none;
}
ol {
  overflow-x: hidden;
  overflow-y: auto;
  height: 70vh;
}
.info {
  font-size: 13px;
  color: rgb(191, 191, 191);
}
form {
  display: flex;
  justify-content: center;
  height: 10vh;
  position: fixed;
  bottom: 10vh;
  width: 100%;
}
</style>

<template>
  <div>
    <MoleculeHeader titel="Game chat" />
    <!-- <div v-if="data">
      <p>{{ data }}</p>
      <p>{{ data.user.name }} aka {{ data.alias }}</p>
    </div> -->

    <!-- <div v-if="user">
      <p>Logged in: {{ loggedIn + "" }}</p>
      <p>Authenticated: {{ authenticated + "" }}</p>
      <p>User: {{ user.name + "" }}</p>
      <p>role: {{ user.role + "" }}</p>
    </div> -->
    <!-- {{ chat }} -->
    <!-- <div v-if="chat"> -->
    <ol>
      <li v-for="chatMessage in chat" :key="chatMessage.id">
        <div
          v-if="chatMessage.player.user_id === user.id"
          class="talk-bubble right tri-right round right-in"
          :class="[chatMessage.player.dead ? ['deadRight', 'dead'] : '']"
        >
          <div class="talktext">
            <p>{{ chatMessage.message }}</p>
            <!-- <p class="info">@{{ $filters.date(chatMessage.send_at) }}</p> -->
          </div>
        </div>
        <div
          v-else
          class="talk-bubble left tri-left round left-in"
          :class="[chatMessage.player.dead ? ['deadLeft', 'dead'] : '']"
        >
          <div class="talktext">
            <p>
              {{ chatMessage.message }}
            </p>
          </div>
        </div>
        <p class="info" v-if="chatMessage.player.user_id === user.id">
          ~You @{{ $filters.date(chatMessage.send_at) }}
        </p>
        <p class="info" v-else>
          ~{{ chatMessage.player.alias }} @{{
            $filters.date(chatMessage.send_at)
          }}
        </p>
      </li>
    </ol>
    <form @submit.prevent="" novalidate>
      <FormField
        id="message"
        v-model.trim="message"
        type="message"
        :required="true"
        label="Message"
        :error="messageError"
        placeholder="Aa"
      ></FormField>
      <AtomButton
        class="clear"
        id="send"
        type="button"
        @click="sendChat()"
        :disabled="!message"
        ><Icon
          icon="akar-icons:send"
          color="#f2f2f2"
          height="4vh"
          :inline="true"
      /></AtomButton>
    </form>
    <!-- </div> -->

    <MoleculeNavigation />
  </div>
</template>

<script>
import MoleculeNavigation from "../molecules/MoleculeNavigation.vue";
import MoleculeHeader from "../molecules/MoleculeHeader.vue";
import FormField from "../molecules/FormField.vue";
import AtomButton from "../atoms/AtomButton.vue";
import { Icon } from "@iconify/vue";
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import store from "../../store";

export default {
  data() {
    return {
      messageError: null,
      message: "",
    };
  },
  props: ["onUpdate:modelValue"],
  components: {
    MoleculeNavigation,
    MoleculeHeader,
    FormField,
    AtomButton,
    Icon,
  },
  computed: {
    ...mapGetters({
      loggedIn: "auth/isLoggedin",
      authenticated: "auth/isAuthenticated",
      user: "auth/user",
      data: "games/getUserFromGame",
      chat: "games/getChat",
    }),
  },

  methods: {
    ...mapActions("games", {
      UserFromGame: "UserFromGame",
      Chat: "Chat",
      addChat: "addChat",
    }),

    sendChat() {
      console.log(this.message);
      store.dispatch("games/addChat", {
        message: this.message,
        gameId: this.$route.params.gameId,
      });
      //message veld gaan leegmaken
      this.message = "";
    },
    // isDisabled(message) {
    //   return message !== true;
    // },
  },
  created() {
    console.log(this.$store._actions);
  },
  mounted() {
    // this.UserFromGame(this.$route.params.gameId);
    this.Chat(this.$route.params.gameId);
  },
};
</script>
