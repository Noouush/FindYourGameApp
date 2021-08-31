<template>
  <div class="container-fluid">
    <router-link to="/admin">
      <button type="button" class="btn btn-primary btn-lg px-2">BACK TO ADMIN PAGE</button>
    </router-link>
    <div class="container">
      <h2>Dashboard</h2>
      <div class="dashboard">
        <div class="up">
          <div @click="bar()" class="graph bar">
            <h5>Game categories</h5>
            <bar-chart style="height: 270px"></bar-chart>
          </div>
          <div @click="line()" class="graph line">
            <h5>Inscriptions number by day last week</h5>
            <line-chart style="height: 270px"></line-chart>
          </div>
          <div @click="pie()" class="graph pie">
            <h5>Top Five Games</h5>
            <pie-chart style="height: 270px"></pie-chart>
          </div>
        </div>
        <div class="down">
          <div @click="visits()" class="graph visit">
            <h5>Visits number by day last week</h5>
            <visit-chart style="height: 270px"></visit-chart>
          </div>
          <div @click="sign()" class="graph signup">
            <h5>Sign Up total number by week last month</h5>
            <sign-chart style="height: 270px"></sign-chart>
          </div>
          <div class="graph coms">
            <h5>Converson Rate Rouded</h5>
            <div class="number">{{ conversionRate }}</div>
          </div>
          <div @click="rate()" class="graph rate">
            <h5>Comments number by day last week</h5>
            <rate-chart style="height: 270px"></rate-chart>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BarChart from "@/components/DashBoard/BarChart";
import LineChart from "@/components/DashBoard/LineChart";
import PieChart from "@/components/DashBoard/PieChart";
import VisitChart from "@/components/DashBoard/VisitChart";
import SignChart from "@/components/DashBoard/SignChart";
import RateChart from "@/components/DashBoard/RateChart";
import apiLaravel from "@/common/api-back";
import { mapState } from "vuex";

export default {
  name: "DashBoard",

  components: {
    BarChart,
    LineChart,
    PieChart,
    VisitChart,
    SignChart,
    RateChart,
  },
  data() {
    return {
      conversionRate: 0,
    };
  },
  computed: {
    ...mapState("authentification", {
      token: (state) => state.user.token,
    }),
  },
  methods: {
    bar() {
      this.$router.push("/admin/dashboard/bar");
    },
    line() {
      this.$router.push("/admin/dashboard/line");
    },
    pie() {
      this.$router.push("/admin/dashboard/pie");
    },
    visits() {
      this.$router.push("/admin/dashboard/visit");
    },
    sign() {
      this.$router.push("/admin/dashboard/sign");
    },
    rate() {
      this.$router.push("/admin/dashboard/rate");
    },
  },
  async mounted() {
    let headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.token}`,
    };
    const { data } = await apiLaravel.get("/conversion", { headers: headers }).catch((error) => console.log(JSON.stringify(error.message)));
    this.conversionRate = Math.round(data.data);
  },
};
</script>

<style scoped lang="scss">
.dashboard {
  width: 1160px;
  height: 685px;
  margin: auto;
  display: flex;
  flex-direction: column;
  border: 5px rgb(104, 166, 224) solid;
  border-radius: 10px;
  background: linear-gradient(0.25turn, #c9eee8, #ebf8e1, #fbe3c8);
}

.up {
  width: 100%;
  display: flex;
  justify-content: space-around;
}

.down {
  width: 100%;
  display: flex;
  justify-content: space-around;
}

.up .graph {
  width: 350px;
  height: 300px;
  cursor: pointer;

  margin: 10px 20px 10px 20px;
}

.down .graph {
  width: 250px;
  height: 300px;
  cursor: pointer;

  margin: 10px 20px 10px 20px;
}

.coms {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.number {
  height: 200px;
  width: 200px;
  margin: auto;
  font-size: 3rem;
  font-weight: 800;
  border: 3px rgb(81, 194, 137) solid;
  border-radius: 100px;
  background-color: rgb(167, 236, 202);
  color: rgb(75, 170, 123);
  vertical-align: middle;
  line-height: 200px;
  padding-left: 25%;
}

h2 {
  font-size: 1.6em;
  text-align: left;
}

h5 {
  background-color: #779ce7;
  color: white;
  padding: 3px;
}
</style>
