<template>
  <div id="navigation-mobile">
    <div class="search">
      <input type="text" placeholder="Search..." />
      <i class="fas fa-search"></i>
    </div>
    <ul>
      <li>HOME</li>
      <li>GAMES</li>
    </ul>
    <ul v-if="authentificated">
      <li>Hello {{ user.username }} !</li>
      <li><router-link to="/">PROFILE</router-link></li>
      <li><router-link to="/logout">LOGOUT</router-link></li>
    </ul>
    <ul v-else>
      <li><router-link to="/login">LOG IN</router-link></li>
      <li><router-link to="/subscribe">SIGN UP</router-link></li>
    </ul>
    <div class="social-media">
      <i class="fab fa-twitter"></i>
      <i class="fab fa-discord"></i>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "NavMobile",
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
  methods: {
  },
  mounted() {
  },
};
</script>

<style lang="scss" scoped>
#navigation-mobile {
  padding: 20px 0 0 0;
  ul {
    list-style: none;
    width: 200px;
    padding-left: 40px;
    li {
      color: #fff;
      font-size: 2rem;
      font-weight: bold;
      margin-bottom: 20px;
      cursor: pointer;
      &:hover {
        color: #111;
      }
    }
  }
  .search {
    position: relative;
    width: 240px;
    margin-bottom: 20px;
    padding-left: 20px;
    input {
      border: none;
      outline: none;
      width: 180px;
      padding: 10px 50px 10px 20px;
      margin: 0;
      border-radius: 20px;
      background-color: #efefef;
      font-family: "Segoe UI", Tahoma;
      font-size: 1rem;
    }
    i {
      position: absolute;
      right: 5px;
      top: 10px;
      font-size: 1.6rem;
      color: #aaa;
      cursor: pointer;
    }
  }
  .social-media {
    position: absolute;
    left: 40px;
    bottom: 20px;
    i {
      margin: 0 20px 0 0;
      color: #fff;
      font-size: 2rem;
    }
  }
}
</style>