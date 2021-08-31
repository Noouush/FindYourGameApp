<template>
<div class="container-fluid">
        <div style="position: relative">
        <input
          type="text"
          class="form-control"
          name="search"
          id="search"
          v-model.trim="search"
          @keyup.enter="$emit('search', search)"
          placeholder="Wich game are you looking for ?"
        />
        <img
          style="
            position: absolute;
            top: 50%;
            right: 1rem;
            transform: translateY(-50%);
            cursor: pointer;
          "
          @click="searchGame()"
          src="../assets/search_black_24dp.svg"
          alt=""
          width="30px"
        />
      </div>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "Search",

  data() {
      return {
          search: "",
      }

  },
  props: {
    games: [],
  },

  methods: {
    ...mapActions({
      fetchGames: "games/FETCH_GAMES",
    }),

  // SEARCH DES GAMES
  // searchGame() {
  //   //console.log(this.search)
  //   let test = this.games.filter(game => game.title == this.search)
  //   console.log(test[0])
  //   },

  computed: {
  ...mapState("games", {
    games: (state) => state.games,
  }),
  },
}
};
</script>

<style>

</style>