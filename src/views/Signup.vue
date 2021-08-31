<template>
  <div class="container">
    <div class="d-flex flex-column align-self-center text-center">
      <img
        class="m-4 align-self-center"
        src="../assets/Logo.svg"
        alt=""
        width="172"
        height="157"
      />
      <h1
        v-if="!formSubmitted || (formSubmitted && !errors.message)"
        @submit.prevent="submitForm"
      >
        SUBSCRIBE FORM
      </h1>
      <!-- if sub confirmed : -->
      <div v-if="formSubmitted">
        <div v-if="errors.message">
          <h1>
            {{ errors.message }}
            <br> Welcome {{ user.username }}
          </h1>
          <p>You can now access to your home page !</p>

          <div class="text-center">
            <router-link to="/">
              <button class="w-25 btn btn-lg btn-primary">
                GOOD LUCK HAVE FUN
              </button>
            </router-link>
          </div>
        </div>
      <!-- end if sub confirmed -->
      <!-- if sub errors -->
        <div v-else>
          <div v-for="(error, index) in errors" :key="index" :error="error">
            <p
              style="
                background-color: rgb(255, 0, 0, 0.1);
                color: rgb(255, 255, 255, 0.7);
                border: 1px solid rgb(255, 255, 255, 0.3);
              "
              class="p-2"
              v-for="(message, index) in error"
              :key="index"
              :message="message"
            >
              {{ message }}
            </p>
          </div>
          <div v-for="error, index in errorsForm" :key="index" :error="error">
            <p
              style="
                background-color: rgb(255, 0, 0, 0.1);
                color: rgb(255, 255, 255, 0.7);
                border: 1px solid rgb(255, 255, 255, 0.3);
              "
              class="p-2"
            >
              {{ error }}
            </p>
          </div>
        </div>
      </div>
      <!-- end if sub errors -->

      <!-- form uniquement si il n'a pas été envoyé ou bien qu'il a été envoyé mais qu'il n'y a pas le message "sub confirmed" -->
      <form
        class="text-left"
        v-if="!formSubmitted || (formSubmitted && !errors.message)"
        @submit.prevent="submitForm"
      >
        <p><span class="plus">+</span> Profile infos</p>
        <div>
          <input
            type="text"
            class="form-control"
            v-model="username"
            placeholder="How should we call you ?"
            required
          />
        </div>
        <div>
          <input
            type="email"
            class="form-control"
            v-model="email"
            placeholder="Pick your email"
            required
          />
        </div>
        <div>
          <input
            type="password"
            class="form-control"
            minlength="5"
            v-model="password"
            placeholder="Choose a password"
            required
          />
        </div>
        <div>
          <input
            type="password"
            class="form-control"
            minlength="5"
            v-model="passwordConfirm"
            placeholder="Confirm your password"
            required
          />
        </div>
        <p><span class="plus">+</span> Your birthdate</p>
        <div class="row mx-1">
          <input
            type="date"
            class="form-control col-4"
            v-model="birthdate"
            placeholder="JJ-MM-AAAA"
            required
          />
          <span class="validity"></span>
        </div>
        <div class="checkbox my-1">
          <label>
            <input type="checkbox" v-model="termsAndConditions" /> I accept the
            <a href="/">Terms and Conditions</a> of FindYourGame Ltd, and
            certify i'm at least 13 years old.
          </label>
        </div>
        <div class="checkbox my-1">
          <label>
            <input type="checkbox" v-model="remember"/> Remember me
          </label>
        </div>
        <div class="text-center">
          <button class="w-25 btn btn-lg btn-primary" type="submit">
            LET'S GO
          </button>
        </div>
      </form>
      <!-- end form -->
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "SignUp",
  data() {
    return {
      username: "",
      email: "",
      password: "",
      passwordConfirm: "",
      birthdate: "",
      termsAndConditions: false,
      errorsForm: [],
      formSubmitted: false,
      remember: false,
    };
  },
  computed: {
    ...mapState("authentification", {
      user: (state) => state.user,
    }),
    ...mapState("errors", {
      errors: (state) => state.errors,
    }),
  },
  methods: {
    ...mapActions({
      register_user: "authentification/REGISTER_USER",
    }),
    submitForm() {
      this.formSubmitted = true;
      var submitform = true;

      // vérification terms and conditions
      if (this.termsAndConditions == false) {
        this.errorsForm.push("You have to accept the Terms and Conditions of FindYourGame Ltd, and certify that you are at least 13 years old.");
        submitform = false;
      }
      // vérification mdp & confirmation
      if (this.password != this.passwordConfirm) {
         this.errorsForm.push("The password and the password confirmation are differents.");
        submitform = false;
      }
      // calcul age
      let today = new Date();
      let birthdate = this.birthdate.split("-");
      if (
        today.getFullYear() - birthdate[0] > 13 ||
        (today.getFullYear() - birthdate[0] == 13 &&
          (today.getMonth() + 1 - birthdate[1] > 0 ||
            (today.getMonth() + 1 - birthdate[1] == 0 &&
              today.getDate() - birthdate[2] >= 0)))
      ) {
        submitform
      } else {
        this.errorsForm.push("You have to be at least 13 years old.");
        submitform = false;
      }

      if (submitform) {
        this.register_user({
          username: this.username,
          email: this.email,
          password: this.password,
          password_confirmation: this.passwordConfirm,
          birthdate: this.birthdate,
          remember: this.remember,
        });
      }
    },
  },
  mounted() {
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
</style>