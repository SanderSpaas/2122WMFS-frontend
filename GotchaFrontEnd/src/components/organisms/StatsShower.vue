<template>
  <div class="flex">
    <div class="container">
      <Bar v-if="deadAndAlive" :chart-data="deadAndAlive[0].chartData" />
    </div>
    <div v-if="gameData">
      <ul>
        <li v-for="player in gameData.players" :key="player.id">
          <p class="name">{{ player.alias }}</p>
          <p>kills: {{ player.kills }}</p>
          <p v-if="player.dead">Alive: ❌</p>
          <p v-else>Alive: ✅</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { Bar } from "vue-chartjs";

export default {
  props: ["gameData", "deadAndAlive"],
  name: "BarChart",
  components: { Bar },
};
</script>
<style lang="scss" scoped>
@import "../../assets/common.scss";
@media only screen and (min-width: 768px) {
  .flex {
    display: flex;
    align-items: center;
    div {
      width: 50vw;
    }
    ul {
      height: auto;
    }
    .container {
      margin-bottom: 10vh;
    }
  }
}
ul {
  overflow-x: hidden;
  overflow-y: auto;
  height: 30vh;
  margin-bottom: 10vh;
}
li {
  display: flex;
  border-bottom: 1px solid;
  p {
    font-size: 20px;
    text-align: center;
    width: 30vw;
    height: 4vh;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .name {
    text-align: left;
  }
}
</style>
