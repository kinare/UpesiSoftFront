import endpoints from "./endpoints";
export default {
    namespaced: true,
    state : {
        products : [
            {
                id : 1,
                name : 'name',
                description : 'dsdsdsd',
                shortDescription : 'dsds',
                availableFrom : 'ddadd',
                availableTo : 'ddadd',
                sku : 'ddadd',
                price : 'ddadd',
                salePrice : 'ddadd',
                taxClassId : 'ddadd',
                state : 1
            }
        ],
        categories : {},
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
        SET_MESSAGE : (state, message, status) => {
            state.message = message
            state.status = status || 'alert-warning'
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
    getters : {},
    actions: {
        getProducts : (context) => {
            context.commit('SET_LOADING', true)
            window.api.call('get',endpoints.products).then((res)=> {
                context.commit('SET_PRODUCTS', res.data.data);
                context.commit('SET_LOADING', false)
            }).catch((error) => {
                context.commit('SET_MESSAGE', error.message, 'alert-warning');
                context.commit('SET_LOADING', false)
            })
        },

        getCategories : (context) => {
            context.commit('SET_LOADING', true)
            window.api.call('get',endpoints.products).then((res)=> {
                context.commit('SET_CAREGORIES', res.data.data);
                context.commit('SET_LOADING', false)
            }).catch((error) => {
                context.commit('SET_MESSAGE', error.message, 'alert-warning');
                context.commit('SET_LOADING', false)
            })
        },



        newProduct : ({context, dispatch}, data) => {
            window.api.call('post',endpoints.insert, data).then(() => {
                dispatch('getProducts');
            }).catch((error) => {
                context.commit('SET_MESSAGE', error.message, 'alert-warning');
            })
        },
    }
}