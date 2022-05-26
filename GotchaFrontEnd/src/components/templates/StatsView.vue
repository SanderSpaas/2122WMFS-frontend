<template>
  <div>
    <MoleculeHeader titel="Statistics" />
    <StatsShower :gameData="gameData" :deadAndAlive="deadAndAlive" />
    <MoleculeNavigation />
  </div>
</template>

<script>
import StatsShower from "../organisms/StatsShower.vue";
import MoleculeNavigation from "../molecules/MoleculeNavigation.vue";
import MoleculeHeader from "../molecules/MoleculeHeader.vue";
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default {
  name: "BarChart",
  data: () => ({
    deadAndAlive: null,
  }),
  components: { MoleculeNavigation, MoleculeHeader, StatsShower },
  computed: {
    ...mapGetters({
      gameData: "games/getGame",
    }),
  },

  methods: {
    ...mapActions("games", {
      Game: "Game",
    }),
    countDead(players) {
      let isDead = 0;
      let isAlive = 0;
      Object.values(players).forEach((player) => {
        if (player.dead) {
          isDead++;
        } else {
          isAlive++;
        }
      });
      // console.log(isDead + " " + isAlive);
      this.deadAndAlive = [
        {
          chartData: {
            labels: ["Dead", "Alive"],
            datasets: [
              {
                label: "Players",
                data: [isDead, isAlive],
                backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(75, 192, 192, 0.2)",
                ],
                borderColor: ["rgb(255, 99, 132)", "rgb(75, 192, 192)"],
                borderWidth: 1,
              },
            ],
          },
        },
      ];
    },
  },
  created() {
    console.log(this.$store._actions);
  },
  async mounted() {
    await this.Game(this.$route.params.gameId).then(() => {
      this.countDead(this.gameData.players);
    });
  },
};
</script>
<style lang="scss" scoped>
@import "../../assets/common.scss";
.container {
  padding: 1em;
}
ul {
  overflow-x: hidden;
  overflow-y: auto;
  height: 30vh;
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
