<script>
import { Line } from 'vue-chartjs'
import { mapState, mapActions } from "vuex";

export default {
  extends: Line,
  data() {
    return {
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
              gridLines: {
                display: true,
              },
            },
          ],
          xAxes: [
            {
              gridLines: {
                display: false,
              },
            },
          ],
        },
        legend: {
          display: false,
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    }
  },
  computed: {
    ...mapState("authentification", {
      token: state => state.user.token,
    }),
    ...mapState("dashboard", {
      inscriptions: state => state.inscriptions,
    })
  },
  methods: {
    ...mapActions({
      fetchinscriptions: "dashboard/FETCH_INSCRIPTIONS",
    }),
  },
  mounted() {
    this.fetchinscriptions(this.token);
    let chartData = {
        labels: this.inscriptions.labels,
        datasets: [
          {
            label: 'Line Chart',
            data: this.inscriptions.data,
            fill: false,
            borderColor: '#2554FF',
            backgroundColor: '#2554FF',
            borderWidth: 1,
          },
        ],
      };
    this.renderChart(chartData, this.options);
  },
}
</script>
