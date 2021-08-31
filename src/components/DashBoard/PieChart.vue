<script>
import { Pie } from "vue-chartjs";
import { mapState, mapActions } from "vuex";
import freetoplay from "@/common/api-freetoplay";

export default {
  extends: Pie,
  data() {
    return {
      loaded: false,
      chartData: {
        labels: ["Combat Arms: Reloaded", "Stay Out", "Tree of Savior", "Firestone Idle RPG", "Kards"],
        datasets: [
          {
            borderWidth: 1,
            borderColor: ["rgba(255,99,132,1)", "rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)", "rgba(75, 192, 192, 1)", "#EC7394"],
            backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)", "rgba(255, 206, 86, 0.2)", "rgba(75, 192, 192, 0.2)", "#F9ACC1"],
            data: ["2", "2", "2", "2", "2"],
          },
        ],
      },
      options: {
        legend: {
          display: true,
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  computed: {
    ...mapState("authentification", {
      token: (state) => state.user.token,
    }),
    ...mapState("dashboard", {
      gamesPopularity: (state) => state.gamesPopularity,
    }),
    ...mapState("games", {
      game: (state) => state.game,
    }),
  },
  methods: {
    ...mapActions({
      fetchGamesPopularity: "dashboard/FETCH_GAMES_POPULARITY",
      fetchGame: "games/GET_GAME",
    }),
    async FETCH_GAME(id) {
      const { data } = await freetoplay
        .get("/game/", {
          params: {
            id: id,
          },
        })
        .catch((error) => console.log(JSON.stringify(error.message)));
      return data.title;
    },
  },
  async mounted() {
    let labels = [];
    let data = [];
    this.fetchGamesPopularity(this.token);
    this.gamesPopularity.sum.forEach(async (game, index, games) => {
      let title = await this.FETCH_GAME(game.game_id);
      // const { data } = await freetoplay
      //   .get("/game/", {
      //     params: {
      //       id: game.game_id,
      //     },
      //   })
      //   .catch((error) => console.log(JSON.stringify(error.message)));
      labels.push(title);
      // console.log(data.title);
      // labels.push(title);
      // console.log(title)
      data.push(parseInt(game.sum, 10));
      if (index === games.length - 1) {
        this.loaded = true;
      }
    });
    // if (this.loaded === true) {
      let chartData = {
        labels: labels,
        datasets: [
          {
            borderWidth: 1,
            borderColor: ["rgba(255,99,132,1)", "rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)", "rgba(75, 192, 192, 1)", "#EC7394"],
            backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)", "rgba(255, 206, 86, 0.2)", "rgba(75, 192, 192, 0.2)", "#F9ACC1"],
            data: data,
          },
        ],
      };
      console.log(data[0]);
      console.log(labels[0]);
      console.log(chartData);
      this.renderChart(this.chartData, this.options);
    // }
  },
};
</script>
