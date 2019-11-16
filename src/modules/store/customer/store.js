import endpoint from "./endpoints";
export default {
    namespaced: true,
    state : {
        customers : [],
        message : '',
        status : '',
        loading : false
    },
    mutations: {
        SET_MESSAGE : (state, payload) => {
            state.message = payload.message || 'Something went wrong';
            state.status = payload.status || 'alert-warning';
        },
        SET_LOADING : (state, loading) => {
            state.loading = loading;
        },
        SWITCH_TAB : (state, index) =>{
            state.tabs.forEach(tab => {tab.status = ''}) //deactivate any active tab
            state.tabs[index].status = 'active' //activate selected tab
        },
        SET_CUSTOMERS : (state, customers) => {
            state.customers = customers
        }
    },
    getters : {
        getCustomer : (state) =>{
            return (id) =>{
                return state.customers.filter(cust => {
                    return cust.id === parseInt(id);
                })[0]
            }
        }
    },
    actions: {
        getCustomers : (context) => {
            context.commit('SET_LOADING', true);
            window.api.call('get', endpoint.customers).then(res =>{
                context.commit('SET_CUSTOMERS', res.data.data);
                context.commit('SET_LOADING', false);
            }).catch(error => {
                context.commit('SET_MESSAGE', {  message : error.response.data.message, status : 'alert-warning'});
                context.commit('SET_LOADING', false);
            })
        },
        newCustomer : ({commit, dispatch}, data) => {
            commit('SET_LOADING', true);
            window.api.call('post', endpoint.insertCustomer, data).then(() =>{
                dispatch('getCustomers');
                Event.$emit('customerAdded2');
            }).catch(error => {
                commit('SET_MESSAGE', {  message : error.response.data.message, status : 'alert-warning'});
                commit('SET_LOADING', false);
            })
        },
        removeCustomer : ({commit, dispatch}, data) => {
            commit('SET_LOADING', true);
            window.api.call('delete', endpoint.deleteCustomers, data).then(() =>{
                dispatch('getCustomers');
            }).catch(error => {
                commit('SET_MESSAGE', {  message : error.response.data.message, status : 'alert-warning'});
                commit('SET_LOADING', false);
            })
        },
    }
}
