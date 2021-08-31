import apiLaravel from "@/common/api-back";

export default {
    namespaced: true,
    state: {
        votesGames: [],
    },
    mutations: {
        SET_VOTESGAMES: (state, votesGames) => (state.votesGames = votesGames),
    },
    actions: {
        async FETCH_VOTESGAMES({ commit }) {
            const { data } = await apiLaravel.get('/votesgames/')
                .catch((error) => console.log(JSON.stringify(error.message)));
            commit("SET_VOTESGAMES", data.data.votes);
        },
        async CREATE_VOTESGAMES({ dispatch }, infos) {
            await apiLaravel.post('/votesgames/', infos.body, { headers: infos.headers })
                .catch((error) => console.log(JSON.stringify(error.message)));
            dispatch("FETCH_VOTESGAMES");
        },
        async DELETE_VOTESGAMES({ dispatch }, infos) {
            await apiLaravel.delete(`/votesgames/${infos.id}`, { headers: infos.headers })
                .catch((error) => console.log(JSON.stringify(error.message)));
            dispatch("FETCH_VOTESGAMES");
        },
        async UPDATE_VOTESGAMES({ dispatch }, infos) {
            await apiLaravel.put(`/votesgames/${infos.id}`, infos.body, { headers: infos.headers })
                .catch((error) => console.log(JSON.stringify(error.message)));
            dispatch("FETCH_VOTESGAMES");
        },
    },
    getters: {
        FILTER_VOTESGAMES: (state, getters, rootState) => {
            return state.votesGames
                .filter((votesGame) => votesGame.user_id == rootState.authentification.user.id)
        },
    }
}