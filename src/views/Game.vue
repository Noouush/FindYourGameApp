<template>
  <div class="container-fluid">
    <div class="row">
      <!-- Intégration des components GameInfo (et GameVote)-->
      <div class="col-md">
        <GameInfo :game="game" />
      </div>
      <!-- Intégration du component de topics et commentaires-->
      <div class="col-md">
        <GameComments :game="game" />
      </div>
    </div>
  </div>
</template>

<script>
// import state et action de l'api-freetoplay
import { mapState, mapActions } from "vuex";

import GameInfo from "@/components/GameInfo.vue";
import GameComments from "@/components/GameComments.vue";

export default {
  name: "Game",
  components: {
    GameInfo,
    GameComments,
  },
  computed: {
    ...mapState("games", {
      game: (state) => state.game,
    }),
  },
  methods: {
    ...mapActions({
      getGame: "games/GET_GAME",
    }),
  },
  mounted() {
    this.getGame(this.$route.params.id);
  },
};
</script>

<style scoped>
.container-fluid {
  margin-top: 4%;
}
</style>
