<template>
  <div
    class="mr-3 gamelittleview"
    :style="'background: url(' + game.thumbnail + ') no-repeat top/cover'"
  >
    <router-link class="card-body text-justify p-3 game-description-under-img" :to="'/game/' + game.id">
      <!-- <div class="card-body text-justify p-3 game-description-under-img"> -->
        <h3>{{ game.title }}</h3>
      <!-- </div> -->
    </router-link>
  </div>
</template>

<script>
// import state et action de l'api-freetoplay
// import { mapState, mapActions } from "vuex";

// import GameInfo from "@/components/GameInfo.vue";
// import GameComments from "@/components/GameComments.vue";

import moment from "moment";

export default {
  name: "GameLittle",
  props: {
    game: Object,
  },
  components: {
    // GameInfo,
    // GameComments,
  },
  computed: {
    // ...mapState("games", {
    //   game: (state) => state.game,
    // }),
  },
  methods: {
    formatDate: (value) => {
      if (value) {
        return moment(String(value)).format("MMMM Do YYYY");
      }
    },
  },
  mounted() {
    // this.getGame(this.$route.params.id);
  },
};
</script>

<style scoped>
.container-fluid {
  margin-top: 4%;
}

.gamelittleview {
  width: 20rem;
  height: 10rem;
  grid-row: 1 / span 1;
  position: relative;
  border-radius: 0.5rem;
}

.game:hover {
  border: 1px solid white;
}

.game-description-under-img {
  position: absolute;
  border-radius: 0.5rem;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0, 0.6);
  /* border: 1px solid transparent; */
}

h3 {
  color: white;
  text-decoration: none;
}
h3:hover {
  color: white;
  text-decoration: none;
}

.game-description-under-img:hover {
  /* border: 1px solid white; */
  background-color: rgb(0, 0, 0, 0.1);

}

.game-description-under-img:hover h3 {

}


.selected {
  cursor: pointer;
  transition: 0.25s;
}

.selected:hover {
  text-decoration: underline;
}
</style>
