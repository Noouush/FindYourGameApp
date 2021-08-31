import apiLaravel from "@/common/api-back";

export default {
    namespaced: true,
    state: {
        users: [],
        // user: {},
    },
    mutations: {
        SET_USERS: (state, users) => (state.users = users),
        // SET_USER: (state, user) => (state.user = user),
    },
    actions: {
        async FETCH_USERS({ commit }) {
            const { data } = await apiLaravel.get('/users/')
                .catch((error) => console.log(JSON.stringify(error.message)));
            commit("SET_USERS", data.data.users);
        },
        // async FETCH_USER({ commit }, id) {
        //     const { data } = await apiLaravel.get(`/users/${id}`)
        //         .catch((error) => console.log(JSON.stringify(error.message)));
        //     commit("SET_USER", data.data.user);
        // }
    },
}