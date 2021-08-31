<template>
  <div class="container-fluid">
    <router-link to="/admin/dashboard">
      <button type="button" class="btn btn-primary btn-md px-2">BACK TO ADMIN DASHBOARD</button>
    </router-link>
    <div class="graph">
      <h3>Visits total number</h3>
      <line-chart></line-chart>
    </div>
  </div>
</template>

<script>
import LineChart from "@/components/DashBoard/LineChart";

export default {
  components: {
    LineChart,
  },
};
</script>

<style scoped lang="scss">
h3 {
  color: rgba(54, 162, 235, 1);
  margin: 30px;
}

.graph {
  width: 1200px;
  margin: auto;
}
</style>
