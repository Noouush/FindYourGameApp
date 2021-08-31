import apiLaravel from "@/common/api-back";

export default {
    namespaced: true,
    state: {
        comments: [],
        comment: {}
    },
    mutations: {
        SET_COMMENTS: (state, comments) => (state.comments = comments),
        SET_COMMENT: (state, comment) => (state.comment = comment),
        // ADD_NEW_COMMENT: (state, comment) => state.comments.push(comment),
    },
    actions: {
        async FETCH_COMMENTS({ commit }) {
            const { data } = await apiLaravel.get('/comments/')
                .catch((error) => console.log(JSON.stringify(error.message)));
            commit("SET_COMMENTS", data);
        },
        async FETCH_COMMENT({ commit }, id) {
            const { data } = await apiLaravel.get(`/comments/${id}`)
                .catch((error) => console.log(JSON.stringify(error.message)));
            commit("SET_COMMENT", data.data.comment);
        },

        // Supprimer un comment
        async DELETE_COMMENT ({ dispatch }, body) {
            const { data } = await apiLaravel.delete(`/comments/${body.id}`,
            { headers: { 
                'Authorization': `Bearer ${body.token}`
              }})
                .catch((error) => console.log(JSON.stringify(error.message)));
            dispatch("FETCH_COMMENTS", data);
        },

        // Ajouter un comment
        async ADD_COMMENT({ dispatch }, body) {
            const check = await apiLaravel.post('/comments/', body.body, 
            { headers: {
            'Authorization': `Bearer ${body.token}`
            }})
                .catch((error) => console.log(JSON.stringify(error.message)));
                if(check) {
                    dispatch("FETCH_COMMENTS");
                }
        },

        // Edit les comments
        async EDIT_COMMENT({ dispatch }, body) {
            const { data } = await apiLaravel.put(`comments/${body.id}`, body.body,
            { headers: {
                'Authorization': `Bearer ${body.token}`
            }})
                .catch((error) => console.log(JSON.stringify(error.message)));
            dispatch("FETCH_COMMENTS", data.data)
        }
    },
}