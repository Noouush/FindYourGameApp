import apiLaravel from "@/common/api-back";

export default {
    namespaced: true,
    state: {
        votesComments: [],
    },
    mutations: {
        SET_VOTESCOMMENTS: (state, votesComments) => (state.votesComments = votesComments),
    },
    actions: {
        async FETCH_VOTESCOMMENTS({ commit }) {
            const { data } = await apiLaravel.get('/votescomments/')
                .catch((error) => console.log(JSON.stringify(error.message)));
            commit("SET_VOTESCOMMENTS", data.data.votes);
        },
    },
}