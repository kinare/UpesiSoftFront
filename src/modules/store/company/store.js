import endpoints from "./endpoints";
export default {
    namespaced : true,
    state : {
        companies : [{
            id : 1,
            name : 'Focus Glass & Aluminium LTD',
            owner : 'Irene',
            email : 'my@mail.com',
            phone : '0708338855',
            address : '3881 30100',
            physicalLocation : 'Nightrose appartment room 2',
            kraPin : 'A0254888L',
            vatNo : '548548',
            users : 5,
            value : 2000000,
            dateCreated : '2019-9-25'
        }],
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
        SET_COMPANY : (state, payload) => {
            state.companies = payload;
        },
    },
    getters : {},
    actions: {
        getCompanies : (context) =>{
            context.commit('SET_LOADING', true);
            window.api.call('get', endpoints.companies ).then(res => {
                context.commit('SET_COMPANY', res.data.data.businessDetails);
                context.commit('SET_LOADING', false);
            }).catch(error => {
                context.commit('SET_MESSAGE',{  message : error.response.data.message, status : 'alert-warning'});
                context.commit('SET_LOADING', false);
            })
        },
        updateCompanyInfo : ({commit, dispatch}, data) =>{
            commit('SET_LOADING', true);
            window.api.call('post', endpoints.companies, data).then(() => {
                commit('SET_LOADING', false);
                dispatch('getCompanies');
            }).catch(error => {
                commit('SET_MESSAGE',{  message : error.response.data.message, status : 'alert-warning'});
                commit('SET_LOADING', false);
            })
        },
    }
}
