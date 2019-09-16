import endpoints from "./endpoints";
export default {
    namespaced: true,
    state : {
        product : {},
        products : [],
        subProducts : [],
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
        SET_PRODUCT :(state, product) => {
            state.product = product
        },
        SET_SUB_PRODUCTS :(state, subs) => {
            state.subProducts = subs
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
        getMeasurmentAbbreviation : (state) => {
          return (id) =>{
              return state.measurementUnit.filter(unit => unit.id === id).shift().measurementAbbreviation;
          }
        },
        getMeasurementUnit : (state) => {return (id) => {return state.measurementUnit.filter(unit => unit.measurementUnitId === id)}},
        posProducts : (state) => {return state.products.filter(item => item.state === 1)},
        products : (state) => {return state.products},
        subProducts : (state) => {return state.subProducts},
        categories : (state) => {return state.categories},
        measurementUnit : (state) => {return state.measurementUnit},
        message : (state) => {return state.message},
        status : (state) => {return state.status},
        loading : (state) => {return state.loading},
        view : (state) => {return state.view},
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
        getSubProducts : (context, id) => {
            context.commit('SET_LOADING', true)
            context.commit('SET_SUB_PRODUCTS', []); // reset sub products
            window.api.call('get', endpoints.subProducts(id)).then((res)=> {
                context.commit('SET_SUB_PRODUCTS', res.data.data);
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
        newProduct : (context, data) => {
            context.commit('SET_LOADING', true);
            window.api.call('post',endpoints.insert, data).then((res) => {
                context.commit('SET_MESSAGE', {  message : res.data.status , status : ''});
                context.commit('SET_PRODUCT', {});
                context.commit('SET_LOADING', false);
            }).catch((error) => {
                context.commit('SET_MESSAGE', {  message : error.response.data.message, status : 'alert-warning'});
                context.commit('SET_LOADING', false);
            })
        },

        restockProduct : ({commit, dispatch}, data) => {
            commit('SET_LOADING', true);
            window.api.call('post',endpoints.restock, data).then((res) => {
                commit('SET_MESSAGE', {  message : res.data.status , status : ''});
                dispatch('getProducts');
                commit('SET_LOADING', false);
            }).catch((error) => {
                commit('SET_MESSAGE', {  message : error.response.data.message, status : 'alert-warning'});
                commit('SET_LOADING', false);
            })
        },
        newCategory : ({context, dispatch}, data) => {
            window.api.call('post',endpoints.newCategory, data).then(() => {
                dispatch('getCategories', { root: true });
            }).catch((error) => {
                context.commit('SET_MESSAGE', {  message : error.response.data.message, status : 'alert-warning'});
            })
        },
        removeCategory : ({context, dispatch}, data) => {
            window.api.call('delete',endpoints.removeCategory, data).then(() => {
                dispatch('getCategories');
            }).catch((error) => {
                context.commit('SET_MESSAGE', {  message : error.response.data.message, status : 'alert-warning'});
            })
        },
        removeProduct : ({context, dispatch}, data) => {
            window.api.call('delete',endpoints.removeProduct, data).then(() => {
                dispatch('getProducts');
            }).catch((error) => {
                context.commit('SET_MESSAGE', {  message : error.response.data.message, status : 'alert-warning'});
            })
        },
    }
}
