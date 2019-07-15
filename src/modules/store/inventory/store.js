import endpoints from "./endpoints";
export default {
    namespaced: true,
    state : {
        products : [],
        categories : {},
        measurementUnit : {},
        message : '',
        status : '',
        loading : true,
        view : 'list',
    },
    mutations: {
        REFRESH_STORE() {},
        SET_PRODUCTS :(state, products) => {
            state.products = products
        },
        SET_MEASUREMENT_UNIT : (state, units) => {
            state.measurementUnit = units
        },
        SET_MESSAGE : (state, payload) => {
            state.message = payload.message || 'Something went wrong'
            state.status = payload.status || 'alert-warning'
        },
        SET_LOADING : (state, loading) => {
            state.loading = loading;
        },
        SET_VIEW : (state, view) => {
            state.view = view;
        },
        SET_CAREGORIES : (state, categories) => {
            state.categories = categories;
        }
    },
    getters : {
        getMeasurementUnit : (state) => {
            return (id) => {
                return state.measurementUnit.filter(unit => unit.id === id)
            }
        }
    },
    actions: {
        getProducts : (context) => {
            context.commit('SET_LOADING', true)
            window.api.call('get',endpoints.products).then((res)=> {
                context.commit('SET_PRODUCTS', res.data.data);
                context.commit('SET_LOADING', false)
            }).catch((error) => {
                context.commit('SET_MESSAGE',{  message : error.response.data.message, status : 'alert-warning'});
                context.commit('SET_LOADING', false)
            })
        },

        getCategories : (context) => {
            context.commit('SET_LOADING', true)
            window.api.call('get',endpoints.categories).then((res)=> {
                context.commit('SET_CAREGORIES', res.data.data);
                context.commit('SET_LOADING', false)
            }).catch((error) => {
                context.commit('SET_MESSAGE', {  message : error.response.data.message, status : 'alert-warning'});
                context.commit('SET_LOADING', false)
            })
        },
        getMeasurementUnits : (context) => {
            context.commit('SET_LOADING', true)
            window.api.call('get',endpoints.measurementUnits).then((res)=> {
                context.commit('SET_MEASUREMENT_UNIT', res.data.data);
                context.commit('SET_LOADING', false)
            }).catch((error) => {
                context.commit('SET_MESSAGE', {  message : error.response.data.message, status : 'alert-warning'});
                context.commit('SET_LOADING', false)
            })
        },

        newProduct : ({context, dispatch}, data) => {
            window.api.call('post',endpoints.insert, data).then(() => {
                dispatch('getProducts', { root: true });
            }).catch((error) => {
                context.commit('SET_MESSAGE', {  message : error.response.data.message, status : 'alert-warning'});
            })
        },

        newCategory : ({context, dispatch}, data) => {
            window.api.call('post',endpoints.newCategory, data).then(() => {
                dispatch('getCategories', { root: true });
            }).catch((error) => {
                context.commit('SET_MESSAGE', {  message : error.response.data.message, status : 'alert-warning'});
            })
        },
    }
}