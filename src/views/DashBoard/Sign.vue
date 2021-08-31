<template>
  <div class="container-fluid">
    <router-link to="/admin/dashboard">
      <button type="button" class="btn btn-primary btn-md px-2">BACK TO ADMIN DASHBOARD</button>
    </router-link>
    <div class="graph">
      <h3>Sign up total number</h3>
      <bar-chart></bar-chart>
    </div>
  </div>
</template>

<script>
import BarChart from "@/components/DashBoard/SignChart";

export default {
  components: {
    BarChart,
  },
};
</script>

<style scoped lang="scss">
h3 {
  color: rgba(153, 102, 255, 1);
  margin: 30px;
}

.graph {
  width: 1200px;
  margin: auto;
}
</style>
