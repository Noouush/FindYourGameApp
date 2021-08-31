import Vue from "vue";
import Vuex from "vuex";
import games from './modules/games';
import authentification from './modules/authentification';
import comments from './modules/comments';
import topics from './modules/topics';
import votesComments from './modules/votesComments';
import votesGames from './modules/votesGames';
import users from './modules/users';
import errors from './modules/errors';
import dashboard from './modules/dashboard';

Vue.use(Vuex);

export default new Vuex.Store({
  // state: {
  //   errors: {}
  // },
  // mutations: {
  //   SET_ERROR_LOG: (rootState, errors) => rootState.errors = errors
  // },
  // actions: {},
  modules: {
    games,
    authentification,
    comments,
    topics,
    votesComments,
    votesGames,
    users,
    errors,
    dashboard,
  },
});
