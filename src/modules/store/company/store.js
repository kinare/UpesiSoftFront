import endpoints from "./endpoints";
export default {
    namespaced : true,
    state : {
        companies : [],
        message : '',
        status : '',
        loading : false,
    },
    mutations: {
        SET_MESSAGE : (state, payload) => {
            state.message = payload.message || 'Something went wrong'
            state.status = payload.status || 'alert-warning'
        },
        SET_LOADING : (state, loading) => {
            state.loading = loading;
        },
    },
    getters : {},
    actions: {
        getCompanies : (context) =>{
            context.commit('SET_LOADING', true);
            window.api.call('get', endpoints.companies ).then(res => {
                context.commit('SET_USERS', res.data.data);
                context.commit('SET_LOADING', false);
            }).catch(error => {
                context.commit('SET_MESSAGE',{  message : error.response.data.message, status : 'alert-warning'});
                context.commit('SET_LOADING', false);
            })
        },
    }
}
