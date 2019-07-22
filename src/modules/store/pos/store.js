import endpoint from "./endpoints";
export default {
    namespaced: true,
    state : {
        tabs : [],
        tabCount : 0,
        customers : [],
        message : '',
        status : '',
        loading : false
    },
    mutations: {
        ADD_TAB : (state, tab) =>{
            //Deactivate all existing tabs
            state.tabs.forEach(tab => { tab.status = ''});
            //Add new active Tab
            state.tabs.push(tab);
            state.tabCount = state.tabCount + 1
        },
        REMOVE_TAB : (state, index) => {
            state.tabs.forEach(tab => {tab.status = ''}) //deactivate any active tab
            state.tabs.splice(index, 1); //remove the selected tab
            state.tabs[index -1].status = 'active' //activate previous tab
        },
        SWITCH_TAB : (state, index) =>{
            state.tabs.forEach(tab => {tab.status = ''}) //deactivate any active tab
            state.tabs[index].status = 'active' //activate selected tab
        },
        SET_CUSTOMERS : (state, customers) => {
            state.customers = customers
        },
        SET_LOADING : (state, status) => {
            state.loading = status
        },
        SET_MESSAGE : (state, payload) => {
            state.message = payload.message || 'Something went wrong'
            state.status = payload.status || 'alert-warning'
        },
    },
    getters : {
        getCustomer : (state) =>{
            return (id) =>{
                return state.customers.filter(cust => {
                    return cust.id === parseInt(id);
                })[0]
            }
        },
        getCurrentTab : (state) =>{
            return state.tabs.filter(tab => {
                return tab.status === 'active'
            }).shift()
        }
    },
    actions : {
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
                Event.$emit('customerAdded');
            }).catch(error => {
                commit('SET_MESSAGE', {  message : error.response.data.message, status : 'alert-warning'});
                commit('SET_LOADING', false);
            })
        },
    }

}