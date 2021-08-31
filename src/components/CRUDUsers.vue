<template>
<div class="container-fluid">
  <router-link to="/admin">
    <button type="button" class="btn btn-primary btn-lg px-2">BACK TO ADMIN PAGE</button>
  </router-link>
  <div class="container-fluid" id="container">
    <h2>MANAGE USERS</h2>
    <table width="100%" id="table">
      <thead id="firstrow">
        <tr>
          <th scope="col">#id</th>
          <th scope="col">Username</th>
          <th scope="col">Email</th>
          <th scope="col">Birthdate</th>
          <th scope="col">IsAdmin</th>
          <th scope="col">Created at</th>
          <th scope="col">Updated at</th>
          <th scope="col">Update</th>
          <th scope="col">Delete</th>
        </tr>
      </thead>
      <tbody id="users" v-for="user in users" :key="user.id" :user="user">
        <tr :id="'user-' + user.id">
          <th scope="row">{{ user.id }}</th>
          <td><input type="text" v-model="user.username" /></td>
          <td><input type="text" v-model="user.email" /></td>
          <td><input type="text" v-model="user.birthdate" /></td>
          <td><input type="text" v-model="user.isadmin" /></td>
          <td>{{ user.created_at }}</td>
          <td>{{ user.updated_at }}</td>
          <td>
            <button type="button" class="btn btn-success btn-sm px-2" @click="update(user.id)">
              <img src="../assets/done.svg" width="20" height="20" />
            </button>
          </td>
          <td>
            <button type="button" class="btn btn-danger btn-sm px-2" @click="deleteUser({id:user.id, token:token})">
              <img src="../assets/delete.svg" width="20" height="20" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "CRUDUsers",
  computed: {
    ...mapState("authentification", {
      users: (state) => state.users,
      token: (state) => state.user.token,
    }),
  },
  methods: {
    ...mapActions({
      fetchUsers: "authentification/FETCH_USERS",
      updateUser: "authentification/UPDATE_USER",
      deleteUser: "authentification/DELETE_USER",
    }),
    update(id) {
      let inputs = document.querySelector(`#user-${id}`).querySelectorAll("input");

      let body = {
        token: this.token,
        id: id,
        body: JSON.stringify({
          username: inputs[0].value,
          email: inputs[1].value,
          birthdate: inputs[2].value,
          isadmin: inputs[3].value,
        }),
      };

      this.updateUser(body);
    },
  },
  mounted() {
    this.fetchUsers(this.token);
  },
};
</script>

<style scoped>
h2 {
  font-size: 1.6em;
  text-align: left;
  /* padding-bottom: 2%; */
}

#table {
  background-color: #111111;
}

#firstrow {
  border: solid #696868e0;
  border-radius: 8px;
}

#users {
  border: solid #696868e0;
  border-radius: 8px;
}

#container {
  padding: 2%;
  /* margin: 2%; */
}

</style>
