<template>
  <div class="container">
    <div class="row">
      <h2>VOTE FOR THIS GAME !</h2>
    </div>
    <div
      v-if="message != ''"
      style="
        background-color: rgb(255, 0, 0, 0.1);
        color: rgb(255, 255, 255, 0.7);
        border: 1px solid rgb(255, 255, 255, 0.3);
      "
    >
      {{ message }}
    </div>
    <div class="row">
      <div class="col-6" align="center">
        <img
          src="../assets/positif.svg"
          width="65"
          height="65"
          class="pouce positif"
          @click="voteplus()"
        />
        <img
          src="../assets/negatif.svg"
          width="65"
          height="65"
          class="pouce negatif"
          @click="voteminus()"
        />
      </div>
      <div class="col-6 d-flex" align="left">
        <img
          src="../assets/negatif.svg"
          width="45"
          height="45"
          class="votes"
          v-if="getNbVotesGames(game.id).tendance == '-'"
        />
        <img
          src="../assets/positif.svg"
          width="45"
          height="45"
          class="votes"
          v-if="getNbVotesGames(game.id).tendance == '+'"
        />
        <p class="nb-votes">{{ getNbVotesGames(game.id).nb_votes }} votes</p>
      </div>
    </div>
    <!-- <div
      class="row"
      id="lastvotes"
      v-if="getNbVotesGames(game.id).nb_votes > 0"
    >
      <h2>LAST VOTES</h2>
      <div
        class="row"
        v-for="votesGame in votesGames"
        :key="votesGame.id"
        :votesGame="votesGame"
      >
        <div class="col-12" v-if="votesGame.game_id == game.id">
          <img
            src="../assets/negatif.svg"
            width="45"
            height="45"
            class="votes"
            v-if="votesGame.vote == -1"
          />
          <img
            src="../assets/positif.svg"
            width="45"
            height="45"
            class="votes"
            v-if="votesGame.vote == 1"
          />
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  name: "GameVote",
  //props -> ID du jeu pour lier au vote
  props: {
    game: Object,
  },

  data: () => ({
    readMore: false,
    message: "",
  }),
  computed: {
    ...mapState("votesGames", {
      votesGames: (state) => state.votesGames,
    }),
    ...mapGetters({
      votesGamesUser: "votesGames/FILTER_VOTESGAMES",
    }),
    ...mapState("authentification", {
      user: (state) => state.user,
      authentificated: (state) => state.authentificated,
    }),
  },
  methods: {
    ...mapActions({
      fetchVotesGames: "votesGames/FETCH_VOTESGAMES",
      createVotesGames: "votesGames/CREATE_VOTESGAMES",
      updateVotesGames: "votesGames/UPDATE_VOTESGAMES",
    }),
    getNbVotesGames(game_id) {
      let nb_votes = 0;
      let total = 0;
      let tendance = "";
      // console.log(game_id)
      this.votesGames.forEach((votesGame) => {
        if (votesGame.game_id == game_id) {
          nb_votes += 1;
          total += votesGame.vote;
        }
      });
      if (total < 0) {
        tendance += "-";
      } else {
        tendance += "+";
      }
      let result = { nb_votes: nb_votes, tendance: tendance };
      return result;
    },
    voteplus() {
      var havetoCreateVote = true;
      if (this.authentificated) {
        this.votesGamesUser.forEach((voteGamesUser) => {
          if (voteGamesUser.game_id == this.game.id) {
            let infos = {
              id: voteGamesUser.id,
              body: {
                game_id: this.game.id,
                user_id: this.user.id,
                vote: 1,
              },
              headers: {
                Authorization: `Bearer ${this.user.token}`,
              },
            };
            this.updateVotesGames(infos);
            havetoCreateVote = false;
          }
        });
        if (havetoCreateVote) {
          let infos = {
            body: {
              game_id: this.game.id,
              user_id: this.user.id,
              vote: 1,
            },
            headers: {
              Authorization: `Bearer ${this.user.token}`,
            },
          };
          this.createVotesGames(infos);
        }

        document.querySelector(".positif").classList.add("checked");
        document.querySelector(".negatif").classList.remove("checked");
      } else {
        this.message = "You have to be authentificated to vote";
      }
    },
    voteminus() {
      var havetoCreateVote = true;
      if (this.authentificated) {
        this.votesGamesUser.forEach((voteGamesUser) => {
          if (voteGamesUser.game_id == this.game.id) {
            let infos = {
              id: voteGamesUser.id,
              body: {
                game_id: this.game.id,
                user_id: this.user.id,
                vote: -1,
              },
              headers: {
                Authorization: `Bearer ${this.user.token}`,
              },
            };
            this.updateVotesGames(infos);
            havetoCreateVote = false;
          }
        });
        if (havetoCreateVote) {
          let infos = {
            body: {
              game_id: this.game.id,
              user_id: this.user.id,
              vote: -1,
            },
            headers: {
              Authorization: `Bearer ${this.user.token}`,
            },
          };
          this.createVotesGames(infos);
        }
        document.querySelector(".positif").classList.remove("checked");
        document.querySelector(".negatif").classList.add("checked");
      } else {
        this.message = "You have to be authentificated to vote";
      }
    },
    voted() {
      this.votesGamesUser.forEach((votesGame) => {
        if (votesGame.game_id == this.game.id) {
          if (votesGame.vote == 1) {
            document.querySelector(".positif").classList.add("checked");
          } else {
            document.querySelector(".negatif").classList.add("checked");
          }
        }
      });
    },
  },
  mounted() {
    this.fetchVotesGames();
    this.voted();
  },
};
</script>

<style scoped>
body {
  margin: 2%;
}

h2 {
  font-size: 1.5em;
  text-align: left;
  padding-bottom: 4%;
  padding-top: 4%;
}

.positif {
  margin: 3%;
}

.negatif {
  margin: 3%;
}

.votes {
  margin: 2%;
  align-self: center;
}

.nb-votes {
  font-size: 1.4em;
  align-self: center;
}

#lastvotes {
  margin-top: 3%;
}

.pouce {
  cursor: pointer;
  border-radius: 50%;
}

.checked {
  background-color: rgb(0, 0, 0, 0.5);
}
</style>