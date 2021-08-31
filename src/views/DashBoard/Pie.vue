<template>
  <div class="container-fluid">
    <router-link to="/admin/dashboard">
      <button type="button" class="btn btn-primary btn-md px-2">BACK TO ADMIN DASHBOARD</button>
    </router-link>
    <div class="graph">
      <h3>Top five games</h3>
      <pie-chart></pie-chart>
    </div>
  </div>
</template>

<script>
import PieChart from "@/components/DashBoard/PieChart";

export default {
  components: {
    PieChart,
  },
};
</script>
<style scoped lang="scss">
h3 {
  color: rgba(255, 206, 86, 1);
  margin: 30px;
}

.graph {
  width: 1200px;
  margin: auto;
}
</style>
