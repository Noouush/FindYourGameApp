<template>
  <div class="container">
    <div class="d-flex flex-column align-self-center">
      <img
        src="../assets/Logo.svg"
        alt=""
        width="172"
        height="157"
        class="m-4 align-self-center"
      />
      <div class="text-center" v-if="authentificated">
        <h1>MISSION ACCOMPLISHED</h1>
        <!-- <h2>See you later</h2> -->
        <router-link to="/">
          <button class="w-25 btn btn-lg btn-primary" type="submit">
            GO HOME
          </button>
        </router-link>
      </div>
      <form v-else @submit.prevent="submitForm">
        <h1>WELCOME BACK</h1>
        <div v-if="!authentificated && !errors.message">
          <div
            style="
              background-color: rgb(255, 0, 0, 0.1);
              color: rgb(255, 255, 255, 0.7);
              border: 1px solid rgb(255, 255, 255, 0.3);
            "
            class="pt-3 m-2 text-center"
            v-for="(error, index) in errors"
            :key="index"
            :error="error"
          >
            <p>
              {{ error }}
            </p>
          </div>
        </div>
        <div>
          <input
            type="text"
            class="form-control"
            v-model="username"
            placeholder="Username"
            require
          />
        </div>
        <div style="position: relative">
          <input
            :type="type"
            class="form-control"
            v-model="password"
            placeholder="Password"
            require
          />
          <img
            class="visibility"
            src="../assets/visibility_black_24dp.svg"
            alt=""
            v-if="displaypassword == false"
            @click="(type = 'text'), (displaypassword = true)"
          />
          <img
            class="visibility"
            src="../assets/visibility_off_black_24dp.svg"
            alt=""
            v-if="displaypassword == true"
            @click="(type = 'password'), (displaypassword = false)"
          />
        </div>
        <div class="checkbox mb-3">
          <label>
            <input type="checkbox" v-model="remember" /> Remember me
          </label>
        </div>
        <button class="w-25 btn btn-lg btn-primary" type="submit">LET'S GO</button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "LogIn",
  data() {
    return {
      displaypassword: false,
      type: "password",
      username: "",
      password: "",
      remember: false,
    };
  },
  computed: {
    ...mapState("authentification", {
      user: (state) => state.user,
      authentificated: (state) => state.authentificated,
    }),
    ...mapState("errors", {
      errors: (state) => state.errors,
    }),
  },
  methods: {
    ...mapActions({
      log_user: "authentification/LOG_USER",
    }),
    submitForm() {
      this.log_user({
        username: this.username,
        password: this.password,
        remember: this.remember,
      });
      this.$store.state.user = this.user;
    },
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
