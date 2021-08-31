<template>
  <div id="navigation">
    <img src="../assets/Logo.svg" alt="Logo FindYourGame" width="75" height="75" />
    <ul>
      <li><router-link to="/">HOME</router-link></li>
      <li><router-link to="/games">GAMES</router-link></li>
    </ul>
    <form>
      <input type="text" placeholder="Search for games" />
      <i class="fas fa-search"></i>
    </form>
    <div class="profile">
      <ul v-if="authentificated">
        <li>Hello {{ user.username }} !</li>
        <li><router-link to="/admin" v-if="user.isadmin === 1">ADMIN</router-link></li>
        <li><router-link to="/logout">LOGOUT</router-link></li>
      </ul>
      <ul v-else>
        <li><router-link to="/login">LOG IN</router-link></li>
        <li><router-link to="/subscribe">SIGN UP</router-link></li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Navbar",
  computed: {
    ...mapState("authentification", {
      user: (state) => state.user,
      authentificated: (state) => state.authentificated,
    }),
  },
  data() {
    return {
      // user: this.$store.state.authentification.user,
    };
  },
  mounted() {
  },
};
</script>

<style scoped lang="scss">
#navigation {
  display: flex;
  background-color: #222222;
  color: white;
  border-radius: 3px;
  padding: 1em;
  width: 100%;
  margin-bottom: 50px;
  padding-left: 60px;

  ul {
    display: flex;
    list-style: none;
    padding-left: 60px;
    margin: 0;
    flex: 1;
    li {
      font-size: 1.2rem;
      margin-right: 1em;
      align-self: center;
      cursor: pointer;
    }
  }
  form {
    position: relative;
    display: flex;
    justify-content: flex-start;
    flex: 3;
    input {
      min-height: 50px;
      border-radius: 24px;
      padding-left: 10px;
      align-self: center;
      flex: 1;
    }
    i {
      position: absolute;
      right: 20px;
      top: 20px;
      font-size: 1.6rem;
      color: #aaa;
      cursor: pointer;
    }
  }

  .profile {
    justify-content: flex-start;
    padding-top: 1.4em;
  }

  a:link {
    text-decoration: none;
  }
  a:hover {
    border-style: solid;
    border-width: 0 0 2px 0;
    padding-bottom: 5px;
    margin-bottom: 20px;
    width: fit-content;
    border-image: linear-gradient(0.25turn, #00ffff, #ff005c) 1;
  }

  a {
    color: white;
  }
}
</style>
