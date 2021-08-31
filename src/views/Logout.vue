<template>
  <div class="container">
    <div class="d-flex flex-column align-self-center text-center">
      <img
        src="../assets/Logo.svg"
        alt=""
        width="172"
        height="157"
        class="m-4 align-self-center"
      />
      <h1>MISSION ACCOMPLISHED</h1>
      <h2>See you later</h2>
      <router-link to="/">
        <button class="w-25 btn btn-lg btn-primary" type="submit">
          GO BACK HOME
        </button>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "LogOut",
  computed: {},
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      log_out: "authentification/LOG_OUT",
    }),
  },
  mounted() {
    this.log_out();
  },
};
</script>

<style scoped>
h1 {
  font-size: 1.8em;
  padding-bottom: 2%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
}

.visibility {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
}
</style>