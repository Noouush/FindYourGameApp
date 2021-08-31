import apiLaravel from "@/common/api-back";

export default {
    namespaced: true,
    state: {
        topics: [],
        topic: {}
    },
    mutations: {
        SET_TOPICS: (state, topics) => (state.topics = topics),
        SET_TOPIC: (state, topic) => (state.topic = topic),
        //ADD_NEW_TOPIC: (state, topic) => state.topics.push(topic),
    },
    actions: {
        async FETCH_TOPICS({ commit }) {
            const { data } = await apiLaravel.get('/topics/')
                .catch((error) => console.log(JSON.stringify(error.message)));
            commit("SET_TOPICS", data.data.topics);
        },

        async GET_TOPIC({ commit }, id) {
            const { data } = await apiLaravel.get(`/topics/${id}`, {

            }).catch((error) => console.log(JSON.stringify(error.message)));
            commit("SET_TOPIC", data.data.topic);
        },

        // DELETE D'UN TOPIC
        async DELETE_TOPIC({ dispatch }, body) {
            const { data } = await apiLaravel.delete(`/topics/${body.id}`,
                {
                    headers: {
                        'Authorization': `Bearer ${body.token}`
                    }
                })
                .catch((error) => console.log(JSON.stringify(error.message)));
            dispatch("FETCH_TOPICS", data);
        },

        // AJOUT D'UN TOPIC
        async ADD_TOPIC({ dispatch }, body) {
            const check = await apiLaravel.post('/topics/', body.body,
                {
                    headers: {
                        'Authorization': `Bearer ${body.token}`
                    }
                })
                .catch((error) => console.log(JSON.stringify(error.message)));
            if (check) {
                dispatch("FETCH_TOPICS")
            }
        },

        // EDIT D'UN TOPIC
        async EDIT_TOPIC({ dispatch }, body) {
            const { data } = await apiLaravel.put(`topics/${body.id}`, body.body,
                {
                    headers: {
                        'Authorization': `Bearer ${body.token}`
                    }
                })
                .catch((error) => console.log(JSON.stringify(error.message)));
            dispatch("GET_TOPIC", data.data.id)
        },
    },
}