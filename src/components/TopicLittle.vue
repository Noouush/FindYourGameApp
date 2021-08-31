<template>
  <div class="mr-3 gamelittleview">
    <div class="row" id="hottopics">
      <div class="col-10" align="left">
        <p class="topic-title">
          <router-link :to="'topic/' + topic.id">{{ topic.title }}</router-link>
        </p>
        <p class="topic-details">
          {{ topic.username }} - {{ formatDate(topic.created_at) }} Last update
          {{ getLastUpdate(topic.updated_at) }}
        </p>
      </div>
      <div class="col-2 align-self-center">
        <p class="nb-comments">{{ getNbComments(topic.id) }}</p>
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
  name: "TopicLittle",

  props: {
    topic: Object,
  },

  computed: {
    ...mapState("topics", {
      topics: (state) => state.topics,
    }),
    ...mapState("comments", {
      comments: (state) => state.comments,
    }),
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


.gamelittleview {
  width: 20rem;
  height: 10rem;
  grid-row: 1 / span 1;
  position: relative;
  border-radius: 0.5rem;
}
</style>