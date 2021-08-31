<template>
  <div class="container-fluid">

    <h1> <span class="plus">+</span> CHECK OUR TOPICS !</h1>

    <div
      v-masonry
      transition-duration="0.3s"
      item-selector=".item"
      :origin-top="true"
      :horizontal-order="false"
    >
      <div class="row my-5">
        <!-- TOPIC -->
        <div v-masonry-tile class="col-lg-4" v-for="topic in topics" :key="topic.id" :topic="topic">
          <div class="container">
            <div class="row" id="hottopics">
              <div class="col-10" align="left">
                <p class="topic-title"><router-link :to="'/topic/'+topic.id">{{ topic.title }}</router-link></p>
                <p class="topic-details">
                  {{ topic.username}} - 
                  {{ formatDate(topic.created_at) }} Last update
                  {{ getLastUpdate(topic.updated_at) }}
                </p>
                <div class="row" id="details">
                <img @click="putFav" v-if="!favTopic" src="../assets/nonfavori.svg" alt="non favori" width="25" height="25">
                <img @click="unFav" v-if="favTopic" src="../assets/favori.svg" alt="non favori" width="25" height="25">
                <p class="tags">TAGS</p>
                </div>
              </div>
              <div class="col-2 align-self-center">
                <p class="nb-comments">{{ getNbComments(topic.id) }}</p>
              </div>
            </div>
          </div>
        </div>
        <!-- FIN TOPIC -->
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { VueMasonryPlugin } from "vue-masonry";
Vue.use(VueMasonryPlugin);
// v-for="(item, index) in blocks"  -> v-for à faire dans le v-masonry-tile selon ce qui va être pris
// Par exemple :  v-for="(post, index) in posts" pour des articles de blogs

import moment from "moment";
import { mapState, mapActions } from "vuex";

export default {
  name: "Topics",

  props: {
    topic: Object,
  },

  data: () => ({
      favTopic: false,
  }),

  methods: {
    // FAV OR NOT
    putFav() {
        this.favTopic = true;
    },
    unFav() {
        this.favTopic = false;
    },

    // GESTION DU FORMAT DATE
    formatDate: (value) => {
      if (value) {
        return moment(String(value)).format("DD/MM/YYYY");
      }
    },
    getLastUpdate(update) {
      return moment(String(update)).calendar();
    },

    // FETCH DES INFOS
    ...mapActions({
      fetchTopics: "topics/FETCH_TOPICS",
      fetchComments: "comments/FETCH_COMMENTS",
    }),

    // METHODES DE RECUP COMMENTS
    getNbComments(topic_id) {
      let nbcomments = 0;
      this.comments.forEach((comment) => {
        if (comment.topic_id == topic_id) {
          nbcomments += 1;
        }
      });
      return nbcomments;
    },
  },

  computed: {
    ...mapState("topics", {
      topics: (state) => state.topics,
    }),
    ...mapState("comments", {
      comments: (state) => state.comments,
    }),
  },

  mounted() {
    this.fetchTopics();
    this.fetchComments();
  },
};
</script>

<style scoped>

h1 {
  font-size: 1.6em;
  margin-left: 2.5em;
}

#hottopics {
  background-color: #222222;
  margin: 2%;
  border-radius: 8px;
  padding: 2%;
}

.nb-comments {
  font-size: 1.3em;
  color: #00ffff;
  font-weight: 700;
}
.topic-details {
  font-style: italic;
  color: #cccccc;
}

.topic-title {
  font-size: 1.2em;
  color: #cccccc;
}

#details {
    padding-left: 10px;
}

.tags {
    padding-left: 10px;
}

img {
    cursor: pointer;
}

.plus {
  font-size: 1.3em;
  font-weight: 700;
  background: linear-gradient(0.25turn, #00ffff, #ff005c);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

a {
  color: white
}
</style>