<template>
  <div class="container-fluid">
    <div class="row">
      <h1><span class="plus">+</span> Welcome, Admin !</h1>
    </div>

    <div class="row">
      <!-- Intégration des components GameInfo (et GameVote)-->
      <div class="col-md">
        <h2>USERS</h2>
        <router-link to="/admin/users">
          <img src="@/assets/yowl-crud-users.jpg" alt="crud users" width="90%" height="90%">
        </router-link>
      </div>
      <!-- Intégration du component de topics et commentaires-->
      <div class="col-md">
        <h2>USERS</h2>
        <router-link to="/admin/dashboard">
          <img src="@/assets/yowl-dashboard.jpg" alt="dashboard" width="80%">
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "Admin",
};
</script>

<style scoped>
h1 {
  font-size: 1.8em;
  text-align: left;
  padding-bottom: 2%;
  padding-left: 3%;
}
</style>
