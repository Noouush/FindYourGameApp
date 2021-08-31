import apiLaravel from "@/common/api-back";

export default {
  namespaced: true,
  state: {
    users: [],
    user: {},
    authentificated: false,
  },
  mutations: {
    SET_USER: (state, user) => ((state.user = user.profile), (state.authentificated = user.authentificated)),
    SET_USERS: (state, users) => (state.users = users),
    UPDATE_USER: (state, newuser) => {
      let index = state.users.findIndex((user) => user.id === newuser.id);
      state.users.splice(index, 1, newuser);
    },
    DELETE_USER: (state, removeuser) => {
      let index = state.users.findIndex((user) => user.id === removeuser.id);
      state.users.splice(index, 1);
    },
  },
  actions: {
    REGISTER_USER({ commit }, infos) {
      let body = {
        username: infos.username,
        email: infos.email,
        password: infos.password,
        password_confirmation: infos.password_confirmation,
        birthdate: infos.birthdate,
      };
      apiLaravel
        .post("/register/", body)
        .then((response) => {
          if (infos.remember) {
            let d = new Date();
            d.setTime(d.getTime() + 1 * 24 * 60 * 60 * 1000);
            let expires = "expires=" + d.toUTCString();
            let profil = JSON.stringify(response.data.data);
            document.cookie = `profil=${profil};${expires};path=/;secure`;
          }
          commit("SET_USER", { profile: response.data.data, authentificated: true });
          commit("errors/SET_ERROR_LOG", response.data, { root: true });
        })
        .catch((error) => commit("errors/SET_ERROR_LOG", error.response.data.data, { root: true }));
      // if (data) {
      //   commit("SET_USERS", data);
      // }
    },
    async LOG_USER({ commit }, infos) {
      let body = {
        username: infos.username,
        password: infos.password,
      };
      apiLaravel
        .post("/login/", body)
        .then((response) => {
          if (infos.remember) {
            let d = new Date();
            d.setTime(d.getTime() + 1 * 24 * 60 * 60 * 1000);
            let expires = "expires=" + d.toUTCString();
            let profil = JSON.stringify(response.data.data);
            document.cookie = `profil=${profil};${expires};path=/;secure`;
          }
          commit("SET_USER", { profile: response.data.data, authentificated: true });
          commit("errors/SET_ERROR_LOG", response.data, { root: true });
        })
        .catch((error) => commit("errors/SET_ERROR_LOG", error.response.data.data, { root: true }));
    },
    LOG_OUT({ commit }) {
      let hasCookie = document.cookie.split(";").some((c) => {
        return c.trim().startsWith("profil" + "=");
      });
      if (hasCookie) {
        document.cookie = "profil" + "=" + ";path=/;secure" + ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
      }
      commit("SET_USER", { profile: {}, authentificated: false });
    },
    async FETCH_USERS({ commit }, token) {
      let headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const { data } = await apiLaravel.get("/users", { headers: headers }).catch((error) => console.log(JSON.stringify(error.message)));
      commit("SET_USERS", data.data.users);
    },
    async UPDATE_USER({ commit }, body) {
      let headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${body.token}`,
      };
      const { data } = await apiLaravel
        .put(`/users/${body.id}`, body.body, { headers: headers })
        .catch((error) => console.log(JSON.stringify(error.message)));
      commit("UPDATE_USER", data.data);
    },
    async DELETE_USER({ commit }, body) {
      let headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${body.token}`,
      };
      const { data } = await apiLaravel
        .delete(`/users/${body.id}`, { headers: headers })
        .catch((error) => console.log(JSON.stringify(error.message)));
      commit("DELETE_USER", data.data);
    },
  },
  getters: {
    GET_USER: (state) => {
      return state.user;
    },
  },
};
