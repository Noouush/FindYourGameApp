export default {
  namespaced: true,
  state: {
    errors: {},
  },
  mutations: {
    SET_ERROR_LOG: (rootState, errors) => rootState.errors = errors
  },
//   actions: {
//   },
}