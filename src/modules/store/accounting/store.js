import endpoints from "./endpoints";
export default {
    namespaced: true,
    state : {
        product : {},
        orders : [],
        invoices : [],
        quotes : [],
        message : '',
        status : '',
        loading : true,
    },
    mutations: {
        SET_ORDERS :(state, orders) => {
            state.orders = orders
        },
        SET_INVOICES :(state, invoices) => {
            state.invoices = invoices
        },
        SET_QUOTES :(state, quotes) => {
            state.quotes = quotes
        },
        SET_MESSAGE : (state, payload) => {
            state.message = payload.message || 'Something went wrong'
            state.status = payload.status || 'alert-warning'
        },
        SET_LOADING : (state, loading) => {
            state.loading = loading;
        },
    },
    getters : {

    },
    actions: {
        getDocuments : (context, param) => {
            context.commit('SET_LOADING', true)
            window.api.call('get', endpoints.document(param)).then((res)=> {
                context.commit(`SET_${param.type}S`, res.data.data);
                context.commit('SET_LOADING', false)
            }).catch((error) => {
                context.commit('SET_MESSAGE',{  message : error.response.data.message, status : 'alert-warning'});
                context.commit('SET_LOADING', false)
            })
        },
    }
}