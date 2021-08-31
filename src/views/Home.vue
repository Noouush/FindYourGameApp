<template>
  <div class="home">
    <div class="content container text-left">
      <div>
        <h1>
          <span class="plus">+</span> Welcome
          <span v-if="authentificated">{{ user.username }}</span>
        </h1>
      </div>
      <div v-if="!authentificated">
        <h2>
          <router-link to="/subscribe">Join us</router-link> to enjoy all the
          possibilities of FindYourGame !
        </h2>
      </div>

      <div>
        <h2>TRENDING GAMES ON DISCUSSIONS</h2>
        <div class="" style="display: flex" id="trendinggames">
          <img
            src="../assets/arrow-left.svg"
            alt=""
            width="40px"
            class="mr-2"
            @click="translategame(1, 'backward')"
          />
          <div class="" style="overflow: hidden">
            <div
              class="gamelittle"
              :style="'transform : translateX(' + translateX1 + 'rem)'"
            >
              <GameLittle
                v-for="game in games.slice(0, nbgamesnew)"
                :key="game.id"
                :game="game"
              />
            </div>
          </div>
          <img
            src="../assets/arrow-right.svg"
            alt=""
            width="40px"
            class="ml-2"
            @click="translategame(1, 'forward')"
          />
        </div>
      </div>
      <div>
        <h2>CHECK THE HOT TOPICS</h2>
        <div id="hottopics">
          <div style="display: flex" id="newgames">
            <img
              src="../assets/arrow-left.svg"
              alt=""
              width="40px"
              class="mr-2"
              @click="translategame(4, 'backward')"
            />
            <div class="" style="overflow: hidden">
              <div
                class="gamelittle"
                :style="'transform : translateX(' + translateX4 + 'rem)'"
              >
                <TopicLittle
                  v-for="topic in topics.slice(0, nbgamesnew)"
                  :key="topic.id"
                  :topic="topic"
                />
              </div>
            </div>
            <img
              src="../assets/arrow-right.svg"
              alt=""
              width="40px"
              class="ml-2"
              @click="translategame(4, 'forward')"
            />
          </div>
          <p>
            See all topics
            <router-link to="/topics"
              ><img src="../assets/arrow-right.svg" alt="" width="20px"
            /></router-link>
          </p>
        </div>
      </div>
      <!-- <div>
        <h2>FRESH OFF THE BAKERY</h2>
        <div id="commentsnew"></div>
      </div> -->
      <div>
        <h2>BEST NEW GAMES</h2>
        <div style="display: flex" id="newgames">
          <img
            src="../assets/arrow-left.svg"
            alt=""
            width="40px"
            class="mr-2"
            @click="translategame(2, 'backward')"
          />
          <div class="" style="overflow: hidden">
            <div
              class="gamelittle"
              :style="'transform : translateX(' + translateX2 + 'rem)'"
            >
              <GameLittle
                v-for="game in games.slice(0, nbgamesnew)"
                :key="game.id"
                :game="game"
              />
            </div>
          </div>
          <img
            src="../assets/arrow-right.svg"
            alt=""
            width="40px"
            class="ml-2"
            @click="translategame(2, 'forward')"
          />
        </div>
        <p>
          See all the new games
          <router-link to="/games/release-date/none/none">
            <img src="../assets/arrow-right.svg" alt="" width="20px" />
          </router-link>
        </p>
      </div>
      <div>
        <h2>GREATEST OF ALL TIMES !</h2>
        <div style="display: flex" id="bestratedgames">
          <img
            src="../assets/arrow-left.svg"
            alt=""
            width="40px"
            class="mr-2"
            @click="translategame(3, 'backward')"
          />
          <div class="" style="overflow: hidden">
            <div
              class="gamelittle"
              :style="'transform : translateX(' + translateX3 + 'rem)'"
            >
              <GameLittle
                v-for="game in gamesFiltered.slice(0, nbgamesnew)"
                :key="game.id"
                :game="game"
              />
            </div>
          </div>
          <img
            src="../assets/arrow-right.svg"
            alt=""
            width="40px"
            class="ml-2"
            @click="translategame(3, 'forward')"
          />
        </div>
        <p>
          See all the most popular games
          <router-link to="/games/popularity/none/none">
            <img src="../assets/arrow-right.svg" alt="" width="20px" />
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import GameLittle from "@/components/GameLittle.vue";
import TopicLittle from "@/components/TopicLittle.vue";

export default {
  name: "Home",
  components: {
    GameLittle,
    TopicLittle,
  },
  data() {
    return {
      platform: "all",
      category: "",
      sortBy: "release-date",
      sortBy2: "popularity",
      translateX1: 0,
      translateX2: 0,
      translateX3: 0,
      translateX4: 0,
      nbgamesnew: 10,
      nbgamesdisplayed: 0,
      windowWidth: window.innerWidth,
      // user: this.$store.state.user,
      search: "",
    };
  },
  computed: {
    ...mapState("games", {
      games: (state) => state.games,
      gamesFiltered: (state) => state.games_filtered,
    }),
    ...mapState("authentification", {
      user: (state) => state.user,
      authentificated: (state) => state.authentificated,
    }),
    ...mapState("topics", {
      topics: (state) => state.topics,
    }),
    ...mapState("comments", {
      comments: (state) => state.comments,
    }),
    // ...mapGetters({
    //   user: "authentification/GET_USER",
    // }),
  },
  methods: {
    ...mapActions({
      fetchGames: "games/FETCH_GAMES",
      fetchGamesFiltered: "games/FETCH_GAMES_FILTERED",
    }),
    // FETCH DES INFOS
    ...mapActions({
      fetchTopics: "topics/FETCH_TOPICS",
      fetchComments: "comments/FETCH_COMMENTS",
    }),
    translategame(nbCaroussel, sens) {
      if (nbCaroussel == 1) {
        if (sens == "backward") {
          this.translateX1 += 21;
          if (this.translateX1 > 0) {
            this.translateX1 = 0;
          }
        } else if (sens == "forward") {
          this.translateX1 -= 21;
          if (
            this.translateX1 <
            -21 * (this.nbgamesnew - this.nbgamesdisplayed)
          ) {
            this.translateX1 = -21 * (this.nbgamesnew - this.nbgamesdisplayed);
          }
        }
      } else if (nbCaroussel == 2) {
        if (sens == "backward") {
          this.translateX2 += 21;
          if (this.translateX2 > 0) {
            this.translateX2 = 0;
          }
        } else if (sens == "forward") {
          this.translateX2 -= 21;
          if (
            this.translateX2 <
            -21 * (this.nbgamesnew - this.nbgamesdisplayed)
          ) {
            this.translateX2 = -21 * (this.nbgamesnew - this.nbgamesdisplayed);
          }
        }
      } else if (nbCaroussel == 3) {
        if (sens == "backward") {
          this.translateX3 += 21;
          if (this.translateX3 > 0) {
            this.translateX3 = 0;
          }
        } else if (sens == "forward") {
          this.translateX3 -= 21;
          if (
            this.translateX3 <
            -21 * (this.nbgamesnew - this.nbgamesdisplayed)
          ) {
            this.translateX3 = -21 * (this.nbgamesnew - this.nbgamesdisplayed);
          }
        }
      } else if (nbCaroussel == 4) {
        if (sens == "backward") {
          this.translateX4 += 21;
          if (this.translateX4 > 0) {
            this.translateX4 = 0;
          }
        } else if (sens == "forward") {
          this.translateX4 -= 21;
          if (
            this.translateX4 <
            -21 * (this.nbgamesnew - this.nbgamesdisplayed)
          ) {
            this.translateX4 = -21 * (this.nbgamesnew - this.nbgamesdisplayed);
          }
        }
      }
    },
    getnbgamesdisplayed() {
      if (this.windowWidth < 700) {
        this.nbgamesdisplayed = 1;
      } else if (this.windowWidth < 1200) {
        this.nbgamesdisplayed = 2;
      } else {
        this.nbgamesdisplayed = 3;
      }
    },
  },
  mounted() {
    this.getnbgamesdisplayed();
    window.onresize = () => {
      this.windowWidth = window.innerWidth;
      this.getnbgamesdisplayed();
    };
    this.fetchGames({
      platform: this.platform,
      category: this.category,
      sortBy: this.sortBy,
    });
    this.fetchGamesFiltered({
      platform: this.platform,
      category: this.category,
      sortBy: this.sortBy2,
    });
    this.fetchTopics();
    this.fetchComments();
  },
};
</script>

<style scoped>
img {
  cursor: pointer;
}

h2 {
  margin: 3rem 0 1rem 0;
}

.gamelittle {
  grid-row: 1 / span 1;
  grid-column: 1 / span 1;
  display: grid;
  grid-template-rows: repeat(1, 1fr);
  transition: 0.25s;
}
</style>
