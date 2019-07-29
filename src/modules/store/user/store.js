import endpoints from "./endpoints";
export default {
    namespaced : true,
    state : {
        users : [],
        groups : [],
        roles : [],
        message : '',
        status : '',
        loading : false,
    },
    mutations: {
        SET_USERS : (state, users) =>{
            state.users = users
        },
        SET_ROLES : (state, roles) =>{
            state.roles = roles
        },
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
        getUsers : (context) =>{
            context.commit('SET_LOADING', true);
            window.api.call('get', endpoints.users ).then(res => {
                context.commit('SET_USERS', res.data.data);
                context.commit('SET_LOADING', false);
            }).catch(error => {
                context.commit('SET_MESSAGE',{  message : error.response.data.message, status : 'alert-warning'});
                context.commit('SET_LOADING', false);
            })
        },
        getRoles : (context) => {
            context.commit('SET_LOADING', true);
            window.api.call('get', endpoints.roles ).then(res => {
                context.commit('SET_ROLES', res.data.data);
                context.commit('SET_LOADING', false);
            }).catch(error => {
                context.commit('SET_MESSAGE',{  message : error.response.data.message, status : 'alert-warning'});
                context.commit('SET_LOADING', false);
            })
        },
        saveUser : (context, data) =>{
            context.commit('SET_LOADING', true);
            window.api.call('post', endpoints.saveUser, data ).then((res) => {
                context.commit('SET_MESSAGE',{  message : res.data.status, status : ''});
                context.commit('SET_LOADING', false);
            }).catch(error => {
               context.commit('SET_MESSAGE',{  message : error.response.data.message, status : 'alert-warning'});
               context.commit('SET_LOADING', false);
            })
        },
        saveRole : (context, data) =>{
            context.commit('SET_LOADING', true);
            window.api.call('post', endpoints.saveRole, data ).then((res) => {
                context.commit('SET_MESSAGE',{  message : res.data.status, status : ''});
                context.commit('SET_LOADING', false);
            }).catch(error => {
               context.commit('SET_MESSAGE',{  message : error.response.data.message, status : 'alert-warning'});
               context.commit('SET_LOADING', false);
            })
        }
    }
}