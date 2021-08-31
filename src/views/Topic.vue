<template>
  <div class="container">
    <div class="row">
      <h1 @dblclick="changeTopic()" v-if="!changeTitle">{{ topic.title }}</h1>
      <input id="title" placeholder="Your changes here" v-show="changeTitle == true" v-model="title" />
      <span class="fav"><img @click="putFav" v-if="!favTopic" src="../assets/nonfavori.svg" alt="non favori" width="35" height="35" /></span>
      <span class="fav"><img @click="unFav" v-if="favTopic" src="../assets/favori.svg" alt="favori" width="35" height="35" /></span>
    </div>
    <div>
      <p class="instructions" v-if="authentificated == true && (user.id == topic.user_id || user.isadmin == 1)">
        Double click on the title to change it
      </p>
    </div>
    <h2>Posted by : {{ topic.username }}</h2>
    <h3>posted on {{ formatDate(topic.created_at) }}</h3>
    <div class="row my-4" v-if="authentificated == true && (user.id == topic.user_id || user.isadmin == 1)">
      <span class="tags"><img src="../assets/edit.svg" width="25" height="25" @click="pushTopic(topic.id)" /></span>
      <span class="tags"><img src="../assets/delete.svg" width="25" height="25" @click="deleteThisTopic(topic.id)" /></span>
    </div>

    <div class="row" id="yourpost" v-if="authentificated == true">
      <textarea class="form-control" id="comment" rows="4" placeholder="Your comment here" v-model="content" />
    </div>

    <div class="row">
      <button class="postit" @click="postComment()">POST IT !</button>
    </div>

    <!-- Début de la section commentaires -->
    <div class="container" v-for="comment in comments" :key="comment.id" :comment="comment">
      <div class="row" id="comments" v-if="comment.topic_id == topic.id" v-bind:hascomments="(hascomments = true)">
        <div class="col-7" align="left">{{ comment.username }}</div>
        <div class="col-5" align="right">
          {{ formatDate(comment.created_at) }}
        </div>
        <div class="col-12">
          <p @dblclick="changeComment(comment)" v-if="!changeContent">
            {{ comment.content }}
          </p>
          <p class="instructions" v-if="authentificated == true && (user.id == comment.user_id || user.isadmin == 1)">
            Double click to change your comment
          </p>
          <textarea id="comment" placeholder="Your changes here" v-show="changeContent == comment.id" v-model="content2" />
        </div>
        <div class="col-3" v-if="authentificated == true">
          <img src="../assets/positif.svg" width="25" height="25" />
          {{ getNbVotesComments(comment.id).votes_plus }}
          "usefull" votes
        </div>
        <div class="col-3" v-if="authentificated == true">
          <img src="../assets/negatif.svg" width="25" height="25" />
          {{ getNbVotesComments(comment.id).votes_minus }}
          "useless" votes
        </div>
        <div class="col-3 d-flex" v-if="authentificated == true && (user.id == comment.user_id || user.isadmin == 1)">
          <img src="../assets/edit.svg" width="25" height="25" @click="pushComment(comment.id)" />
          <p class="instructions">Click to commit your changes</p>
        </div>
        <div class="col-3 d-flex" v-if="authentificated == true && (user.id == comment.user_id || user.isadmin == 1)">
          <img src="../assets/delete.svg" width="25" height="25" @click="deleteComment({ id: comment.id, token: user.token })" />
          <p class="instructions">Click to delete your comment</p>
        </div>
      </div>
    </div>

    <!-- S'il n'y a pas de commentaires -->
    <div class="container">
      <div class="row" id="nocomments" v-if="hascomments == false">
        <div class="col">
          <p class="nocomments-title">This topic has not been commented yet... Add your comment to start the discussion !</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import moment from "moment";

export default {
  name: "Topic",

  data: () => ({
    favTopic: false,
    hascomments: false,
    content: "",
    content2: "",
    title: "",
    changeContent: false,
    changeTitle: false,
  }),

  methods: {
    changeTopic() {
      if (this.authentificated == true && (this.user.id == this.topic.user_id || this.user.isadmin == 1)) {
        this.changeTitle = true;
      }
      
    },
    //check if authenticate to change comment
    changeComment(comment) {
      if (this.authentificated == true && (this.user.id == comment.user_id || this.user.isadmin == 1)) {
        this.changeContent = comment.id;
      }
    },

    // MISE DU TOPIC EN FAV
    putFav() {
      this.favTopic = true;
    },
    unFav() {
      this.favTopic = false;
    },

    // MISE AU FORMAT DE LA DATE
    formatDate: (value) => {
      if (value) {
        return moment(String(value)).format("MMMM Do YYYY");
      }
    },

    // MAP DES ACTIONS DU STORE
    ...mapActions({
      getTopic: "topics/GET_TOPIC",
      fetchComments: "comments/FETCH_COMMENTS",
      fetchVotesComments: "votesComments/FETCH_VOTESCOMMENTS",
      deleteComment: "comments/DELETE_COMMENT",
      deleteTopic: "topics/DELETE_TOPIC",
      addComment: "comments/ADD_COMMENT",
      editComment: "comments/EDIT_COMMENT",
      editTopic: "topics/EDIT_TOPIC",
      getGame: "games/GET_GAME",
    }),

    // + OU - DE COMMENTS (Formule de Manon)
    getNbVotesComments(comment_id) {
      let nb_votes_comments_plus = 0;
      let nb_votes_comments_minus = 0;
      this.votesComments.forEach((votesComment) => {
        if (votesComment.comment_id == comment_id) {
          if (votesComment.vote == 1) {
            nb_votes_comments_plus += 1;
          } else if (votesComment.vote == -1) {
            nb_votes_comments_minus += 1;
          }
        }
      });
      let nb_votes = {
        votes_plus: nb_votes_comments_plus,
        votes_minus: nb_votes_comments_minus,
      };
      return nb_votes;
    },

    // SUPPRESSION DU TOPIC ET RELOAD
    deleteThisTopic(id) {
      this.deleteTopic({
        id: id,
        token: this.user.token,
      }),
        this.$router.push("/");
    },

    // AJOUT D'UN NOUVEAU COMMENT
    postComment() {
      if (this.content == "") {
        alert("Please add a content to post a comment");
        return;
      }

      this.addComment({
        token: this.user.token,
        body: {
          topic_id: this.topic.id,
          user_id: this.user.id,
          content: this.content,
        },
      }),
        (this.content = "");
    },

    // EDIT D'UN COMMENT
    pushComment(id) {
      (this.changeContent = false),
        this.editComment({
          id: id,
          token: this.user.token,
          body: {
            topic_id: this.topic.id,
            user_id: this.user.id,
            content: this.content2,
          },
        }),
        (this.content2 = "");
    },

    // EDIT D'UN TOPIC
    pushTopic(id) {
      (this.changeTitle = false),
        this.editTopic({
          id: id,
          token: this.user.token,
          body: {
            game_id: this.game.id,
            user_id: this.user.id,
            title: this.title,
          },
        }),
        (this.title = "");
    },
  },

  computed: {
    ...mapState("topics", {
      topic: (state) => state.topic,
    }),
    ...mapState("comments", {
      comments: (state) => state.comments,
    }),
    ...mapState("votesComments", {
      votesComments: (state) => state.votesComments,
    }),
    ...mapState("authentification", {
      user: (state) => state.user,
      authentificated: (state) => state.authentificated,
    }),
    ...mapState("games", {
      game: (state) => state.game,
    }),
  },

  mounted() {
    this.getTopic(this.$route.params.id);
    this.fetchComments();
    this.fetchVotesComments();
    this.getGame(this.$route.params.id);
  },
};
</script>

<style scoped>
.fav {
  padding-left: 20px;
  padding-top: 5px;
}

img {
  cursor: pointer;
}

h2 {
  font-size: 1.4em;
}

h3 {
  font-size: 1.2em;
}

.tags {
  padding-left: 20px;
}

/* CSS de la partie post de commentaires */

#yourpost {
  width: 50%;
}

#comment {
  border-radius: 8px;
  width: 90%;
  border: none;
  padding: 5px;
  padding-left: 20px;
  margin: 2%;
}

.postit {
  color: white;
  margin: 3%;
  padding: 8px 18px;
  border: 1px solid linear-gradient(0.25turn, #00ffff, #ff005c);
  /*border-image-slice: 1;*/
  border-radius: 24px;
  background-color: transparent;
}

.postit:hover {
  color: white;
  margin: 3%;
  padding: 8px 18px;
  border: none;
  /*border-image-slice: 1;*/
  border-radius: 24px;
  background-image: linear-gradient(0.25turn, #00ffff, #ff005c);
}

/* CSS de la partie commentaires */

#comments {
  background-color: #222222;
  margin: 2%;
  border-radius: 8px;
  padding: 2%;
}

#nocomments {
  background-color: #222222;
  border-radius: 8px;
  margin: 2%;
  padding: 2%;
  min-width: 80%;
}

.nocomment-title {
  font-size: 1.2em;
  color: #cccccc;
}

.instructions {
  font-size: 0.7em;
  font-style: italic;
  color: #cccccc;
  padding-left: 10px;
}

#title {
  border-radius: 8px;
  width: 90%;
  border: none;
  padding: 5px;
  padding-left: 20px;
  margin: 2%;
}
</style>
